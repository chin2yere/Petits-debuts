import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PointsTopUp.css";
import { UserContext } from "../../UserContext.js";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
//this function returns the buttons
const ButtonWrapper = ({ currency, showSpinner, amount, style }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  //this function updates the bank
  const updateBank = async () => {
    try {
      // Make the signup API request

      const response = await fetch(`http://localhost:3000/buyer/topup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyer: user.id,
          deduction: parseInt(amount) * 100,
        }),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const newUser = data.updatedMoney;
        updateUser(newUser);

        navigate("/");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("money update failed: " + error);
    }
  };
  //end of bank

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
            updateBank();
          });
        }}
      />
    </>
  );
};

const PayPal = () => {
  const { user } = useContext(UserContext);
  const [amount, setAmount] = useState("");

  const clearCartValue = {};
  const clearCartValueTotal = 0.0;
  const navigate = useNavigate();

  const currency = "USD";
  const style = { layout: "vertical" };

  function calculateAmount(amount) {
    if (amount === "") {
      return "1";
    } else {
      return String(amount / 100);
    }
  }

  return (
    <div className="paypal">
      <h3>Enter top up amount in points</h3>
      <h5>Please note, 100points = 1 dollar</h5>
      <input
        type="text"
        id="username"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <h5>Purchase more points using the methods below</h5>
      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
        <PayPalScriptProvider
          options={{
            clientId:
              "AaZMRUGEL-RKuQ7zatoRgOnl7B29BtmnzNeGpPIrdP9QwlBFqhcS_3R3NtLN0TGPmNTTpnZGSC1rGKVb",
            components: "buttons",
            currency: "USD",
          }}
        >
          <ButtonWrapper
            currency={currency}
            showSpinner={false}
            amount={calculateAmount(amount)}
            style={style}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default PayPal;
