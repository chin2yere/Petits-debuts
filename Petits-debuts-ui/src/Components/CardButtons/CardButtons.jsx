import * as React from "react";
import "./CardButtons.css";
import { useState } from "react";

export default function CardButtons({
  id,
  service,
  cart,
  updateCart,
  personalCart,
  setPersonalCart,
}) {
  function plusBtn() {
    console.log({ id, service, cart, personalCart });

    const keyExists = id in personalCart;
    console.log(keyExists);
    if (keyExists === true) {
      const temp = { ...personalCart };
      temp[id] += 1;
      setPersonalCart(temp);
      //now update the cart object
      const tempcart = { ...cart };
      tempcart.cart = temp;
      updateCart(tempcart);
      console.log(tempcart);
    } else {
      const temporary = { ...personalCart, [id]: 1 };
      setPersonalCart(temporary);
      //now update the cart object
      const tempcart = { ...cart };
      tempcart.cart = temporary;
      updateCart(tempcart);
      console.log(tempcart);
    }
  }
  function minusBtn() {
    const keyExists = id in personalCart;
    if (keyExists === true) {
      const temp = { ...personalCart };
      temp[id] -= 1;
      setPersonalCart(temp);
      //now update the cart
      const tempcart = { ...cart };
      tempcart.cart = temp;
      updateCart(tempcart);
      console.log(tempcart);
    }
  }

  function countValue() {
    if (!personalCart || !personalCart[id] || personalCart[id] <= 0) {
      return "";
    } else {
      return personalCart[id];
    }
  }
  if (service) {
    return (
      <div>
        <button>Schedule here</button>
      </div>
    );
  } else {
    return (
      <div className="card-buttons">
        <div className="incrementBtn">
          <div className="row">
            <button onClick={() => plusBtn()} className="button-card">
              <i className="material-icons">add</i>
            </button>
            <button
              onClick={() => {
                if (personalCart[id] && personalCart[id] != 0) {
                  minusBtn();
                }
              }}
              className="button-card"
            >
              <i className="material-icons">remove</i>
            </button>
          </div>
          <p>{countValue()}</p>
        </div>
      </div>
    );
  }
}
