import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductsPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import SignupPage from "../Authentication/SignupPage";
import LoginPage from "../Authentication/LoginPage";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrderPage/MyOrderPage";
import Logout from "../Authentication/Logout";
import ProtectedRoute from "./ProtectedRoute";
import UserContext from "../../contexts/UserContext";

const Routing = () => {
  const user = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <SignupPage />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrderPage />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default Routing;
