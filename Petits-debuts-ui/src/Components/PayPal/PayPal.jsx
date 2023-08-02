import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserContext,
  CartContext,
  TotalContext,
  MoneyUpdateContext,
  CheckoutTypeContext,
} from "../../UserContext.js";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
//this page handles the process of buying new points when a user tries to checkout with insufficient funds

//this function returns the buttons
const ButtonWrapper = ({ currency, showSpinner, amount, style }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const { moneyUpdateContext, setMoneyUpdateContext } =
    useContext(MoneyUpdateContext);
  const { user, updateUser } = useContext(UserContext);
  const { totalContext } = useContext(TotalContext);
  const { checkoutTypeContext } = useContext(CheckoutTypeContext);
  const navigate = useNavigate();
  //this function updates the bank
  const updateBank = async () => {
    try {
      // Make the bank update API request

      const response = await fetch(`http://localhost:3000/buyer/topup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyer: user.id,
          deduction: totalContext * 100 - user.money,
        }),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const newUser = data.updatedMoney;
        updateUser(newUser);

        if (checkoutTypeContext === "goods") {
          navigate("/checkoutcart");
        } else if (checkoutTypeContext === "service") {
          navigate("/checkoutservices");
        }
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("money update failed: " + error);
    }
  };
  //end of bank update

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
  const { cartContext, setCartContext } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { totalContext } = useContext(TotalContext);
  const { moneyUpdateContext, setMoneyUpdateContext } =
    useContext(MoneyUpdateContext);

  const clearCartValue = {};
  const clearCartValueTotal = 0.0;
  const navigate = useNavigate();
  const amount = String((totalContext * 100 - user.money) / 100);
  const currency = "USD";
  const style = { layout: "vertical" };

  useEffect(() => {
    localStorage.setItem(
      "moneyUpdateContext",
      JSON.stringify(moneyUpdateContext)
    );
  }, [moneyUpdateContext]);

  return (
    <div className="paypal">
      <h3>Oops! you are short by {totalContext * 100 - user.money}</h3>
      <h4>
        To complete this purchase, you will need a total of {totalContext * 100}
        points
      </h4>
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
            amount={amount}
            style={style}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default PayPal;
