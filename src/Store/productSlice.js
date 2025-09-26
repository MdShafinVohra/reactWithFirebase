import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const products = await getDocs(collection(db, "contactForm"));

  const filteredData = products.docs.map((product) => {
    const data = product.data();

    // Check if the timestamp exists and is a Firebase Timestamp object
    if (data.timestamp && data.timestamp.toDate) {
      // Convert the Firestore Timestamp object to a JavaScript Date object
      // or to an ISO string for better serialization.
      // Let's use an ISO string, which is fully serializable.
      data.timestamp = data.timestamp.toDate().toISOString();
    }

    return { ...data, id: product.id };
  });

  return filteredData;
});

const productSlice = createSlice({
  name: "productSlice",
  initialState: { productList: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productList = action.payload;
    });
  },
});

export const productActions = productSlice.actions;
export default productSlice;
