import * as React from "react";
import "./CardButtons.css";
import { useState } from "react";

export default function CardButtons({ id, service, cart, updateCart }) {
  //id=id.toString();
  const [personalCart, setPersonalCart] = useState(cart.cart);
  
  function plusBtn() {
    
    const keyExists = id in {personalCart};
    console.log(keyExists);
    if (keyExists === true) {
      const temp = { ...personalCart };
      temp[id] += 1;
      setPersonalCart(temp);
      //now update the cart object
      

    } else {
      setPersonalCart({ ...personalCart, [id]: 1 });
    }
    const tempcart = { ...cart };
      tempcart[cart] = personalCart;
      updateCart(tempcart);
      console.log(tempcart);
  }
  function minusBtn() {
    const keyExists = id in personalCart;
    if (keyExists === true) {
      const temp = { ...personalCart };
      temp[id] -= 1;
      setPersonalCart(temp);
    }
    const tempcart = { ...cart };
      tempcart[cart] = personalCart;
      updateCart(tempcart);

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
