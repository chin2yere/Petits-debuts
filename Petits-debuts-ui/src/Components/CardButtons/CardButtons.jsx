import * as React from "react";
import "./CardButtons.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CardButtons({
  id,
  service,
  cart,
  updateCart,
  personalCart,
  setPersonalCart,
  availability,
  serviceWallet,
  setServiceWallet,
}) {
  const [startDate, setStartDate] = useState(null);
  function plusBtn() {
    const keyExists = id in personalCart;

    if (keyExists === true) {
      const temp = { ...personalCart };
      temp[id] += 1;
      setPersonalCart(temp);
      //now update the cart object
      const tempcart = { ...cart };
      tempcart.cart = temp;
      updateCart(tempcart);
    } else {
      const temporary = { ...personalCart, [id]: 1 };
      setPersonalCart(temporary);
      //now update the cart object
      const tempcart = { ...cart };
      tempcart.cart = temporary;
      updateCart(tempcart);
    }
  }
  function minusBtn() {
    const keyExists = id in personalCart;
    if (keyExists === true) {
      const temp = { ...personalCart };
      temp[id] -= 1;
      setPersonalCart(temp);
      //now update the cart object
      const tempcart = { ...cart };
      tempcart.cart = temp;
      updateCart(tempcart);
    }
  }

  function countValue() {
    if (!personalCart || !personalCart[id] || personalCart[id] <= 0) {
      return "";
    } else {
      return personalCart[id];
    }
  }
  const isValidDate = (date) => {
    const currentDate = new Date();
    const dayFromDate = date.getDate();
    const validity =
      !(date < currentDate) && availability.includes(dayFromDate);

    return validity;
  };
  const filterTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return !(currentDate.getDate() === selectedDate.getDate());
  };
  function updateServiceWallet(date) {
    if (date) {
      const keyExists = id in serviceWallet;
      if (keyExists) {
        const tempwallet = { ...serviceWallet };
        tempwallet[id] = date;
        setServiceWallet(tempwallet);
      } else {
        const temporary = { ...serviceWallet, [id]: date };
        setServiceWallet(temporary);
      }
    } else {
      const keyExists = id in serviceWallet;
      if (keyExists) {
        const tempwallet = { ...serviceWallet };
        tempwallet[id] = date;
        setServiceWallet(tempwallet);
      }
    }
  }
  if (service) {
    return (
      <div>
        <div>
          <button>Schedule here</button>
          <DatePicker
            className="custom-datepicker"
            showTimeSelect
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              updateServiceWallet(date);
            }}
            isClearable
            filterDate={isValidDate}
            filterTime={filterTime}
            placeholderText="mm/dd/yyyy"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <div>
          <h5>Note : Dates are not reserved until payment is made</h5>
        </div>
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
