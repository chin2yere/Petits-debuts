import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CheckoutServices.css";
import {
  UserContext,
  ServiceContext,
  TotalContext,
} from "../../UserContext.js";

const CheckoutServices = () => {
  const { serviceContext, setServiceContext } = useContext(ServiceContext);
  const { user } = useContext(UserContext);
  const { totalContext } = useContext(TotalContext);
  const clearCartValue = {};
  const clearCartValueTotal = 0.0;
  const navigate = useNavigate();

  const postOrders = async (id) => {
    try {
      // Make the checkout API request

      const response = await fetch(`http://localhost:3000/order/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartContext: serviceContext,
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

  function clearServiceCart() {
    setServiceContext(null);
    navigate("/");
  }
  console.log("hi");
  return (
    <div className="checkout-cart">
      <h3>Click here to confirm checkout</h3>
      <button
        onClick={() => {
          postOrders(user.id);
          clearServiceCart();
        }}
      >
        Okay
      </button>
    </div>
  );
};

export default CheckoutServices;
