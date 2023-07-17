import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CheckoutCart.css";
import { UserContext, CartContext, TotalContext } from "../../UserContext.js";

const CheckoutCart = () => {
  const { cartContext, setCartContext } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { totalContext } = useContext(TotalContext);
  const clearCartValue = {};
  const clearCartValueTotal = 0.0;
  const navigate = useNavigate();

  const postOrders = async (id) => {
    try {
      // Make the signup API request

      const response = await fetch(`http://localhost:3000/order/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartContext,
          totalContext,
          id,
        }),
        credentials: "include",
      });
    } catch (error) {
      // Handle any network or API request errors
      alert("order creation failed: " + error);
    }
  };

  const clearCart = async (id) => {
    try {
      // Make the signup API request

      const response = await fetch(`http://localhost:3000/cart/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clearCartValue,
          clearCartValueTotal,
          id,
        }),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("order creation failed: " + error);
    }
  };

  console.log("hi");
  return (
    <div className="checkout-cart">
      <h3>Click here to confirm checkout</h3>
      <button
        onClick={() => {
          postOrders(user.id);
          clearCart(user.id);
        }}
      >
        Okay
      </button>
    </div>
  );
};

export default CheckoutCart;
