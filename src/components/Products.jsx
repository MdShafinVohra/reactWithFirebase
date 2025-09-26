import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Store/productSlice";
import { useEffect } from "react";

export default function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetProducts = () => {
      dispatch(getProducts());
    };
    handleGetProducts();
  });

  const products = useSelector((state) => state.products.productList);

  return (
    <>
      {products.map((entry) => (
        <ul key={entry.name + entry.email}>
          <li>{entry.name}</li>
          <li>{entry.email}</li>
          <li>{entry.number}</li>
          <li>{entry.message}</li>
        </ul>
      ))}
    </>
  );
}
