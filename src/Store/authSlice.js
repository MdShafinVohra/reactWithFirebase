// authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../config/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

async function addUserToDatabase(user) {
  try {
    await setDoc(doc(db, "users", user.uid), user);
    console.log("User added to DB:", user.uid);
  } catch (error) {
    console.error("Error adding user:", error.message);
  }
}

export const loginWithEmailAndPassword = createAsyncThunk("auth/loginWithEmailAndPassword", async ({ email, password }, thunkApi) => {
  try {
    // Step 1: Sign in and get the user's uid from the response
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userUid = user.uid;

    // Step 2: Use the uid to get the document from Firestore
    const userDocRef = doc(db, "users", userUid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData; // Return both auth user and Firestore data
    } else {
      // Handle case where user is authenticated but no Firestore doc exists
      // This can happen if the user was created without a database entry.
      return user;
    }
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export const registerWithEmailAndPassword = createAsyncThunk(
  "auth/registerWithEmailAndPassword",
  async ({ email, password, displayName, photoURL, phoneNumber }, thunkApi) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: displayName,
        photoURL: photoURL,
      });

      const user = userCredential.user;
      const serializableUser = {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        photoURL: photoURL,
        phoneNumber: phoneNumber,
      };

      // Corrected: Pass the serializable object to the database
      await addUserToDatabase(serializableUser);

      return serializableUser;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk("auth/signInWithGoogle", async (_, thunkApi) => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    const user = response.user;

    // Corrected: Extract only the serializable data you need
    const serializableUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      // You can add other properties here if needed
    };

    // Corrected: Pass the serializable object to the database
    await addUserToDatabase(serializableUser);

    // Return the serializable object to the Redux store
    return serializableUser;
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export const logOut = createAsyncThunk("auth/logOut", async () => {
  await signOut(auth);
});

// End of Async Thunks and other functions
// .
// .

// Start of Slice

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, user: null },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setUser(state, action) {
      if (action.payload) {
        state.isLoggedIn = true;
        state.user = action.payload;
      } else {
        state.isLoggedIn = false;
        state.user = null;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerWithEmailAndPassword.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
