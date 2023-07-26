import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CheckoutCart.css";
import { UserContext, CartContext, TotalContext } from "../../UserContext.js";

import { accessToken } from "../../../api-key";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const ButtonWrapper = ({ currency, showSpinner, amount, style }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
          });
        }}
      />
    </>
  );
};

const CheckoutCart = () => {
  const { cartContext, setCartContext } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { totalContext } = useContext(TotalContext);
  const clearCartValue = {};
  const clearCartValueTotal = 0.0;
  const navigate = useNavigate();

  //
  const amount = "13.99";
  const currency = "USD";
  const style = { layout: "vertical" };

  //
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

  return (
    <div className="checkout-cart">
      <h3>Click here to confirm checkout</h3>
      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
        <PayPalScriptProvider
          options={{
            clientId: "test",
            components: "buttons",
            currency: "USD",
          }}
        >
          <ButtonWrapper
            currency={currency}
            showSpinner={false}
            amount={amount}
            style={style}
          />
        </PayPalScriptProvider>
      </div>
      {/* //do not delete the commented button below is crucial in the next phase of development */}
      {/* <button
        onClick={() => {
          postOrders(user.id);
          clearCart(user.id);
        }}
      >
        Okay
      </button> */}
    </div>
  );
};

export default CheckoutCart;
