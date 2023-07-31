import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CheckoutCart.css";
import {
  UserContext,
  CartContext,
  TotalContext,
  MoneyUpdateContext,
} from "../../UserContext.js";

const CheckoutCart = () => {
  const { cartContext, setCartContext } = useContext(CartContext);
  const { user, updateUser } = useContext(UserContext);
  const { totalContext } = useContext(TotalContext);
  const { moneyUpdateContext, setMoneyUpdateContext } =
    useContext(MoneyUpdateContext);

  const clearCartValue = {};
  const clearCartValueTotal = 0.0;
  const navigate = useNavigate();

  //network money calls
  const networkCallsForPoints = async () => {
    try {
      // Make the signup API request

      const response = await fetch(`http://localhost:3000/money/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyer: user.id,
          deduction: totalContext * 100,
          moneyUpdateContext,
          context: cartContext,
        }),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const newUser = data.updatedMoney;
        updateUser(newUser);
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("money update failed: " + error);
    }
  };

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
        navigate("/success");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("order creation failed: " + error);
    }
  };

  return (
    <div className="checkout-cart">
      <h3>Goodnews, Your points are adequate to make this purchase. </h3>
      <h3>Click below to confirm checkout. </h3>
      <h4>This purchase will cost you {totalContext * 100} points</h4>

      <button
        onClick={() => {
          networkCallsForPoints();
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
