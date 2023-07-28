import * as React from "react";
import "./TopBar.css";
import { useState, useEffect, useContext } from "react";
import {
  CartContext,
  ServiceContext,
  ProductContext,
} from "../../UserContext.js";
import { Link } from "react-router-dom";

export default function TopBar({ personalCart, serviceWallet }) {
  const { setServiceContext } = useContext(ServiceContext);
  const { setCartContext } = useContext(CartContext);
  const [toggleOn, setToggleOn] = useState(false);
  function toggleMenu() {
    setToggleOn(!toggleOn);
  }
  function setCartNecessities() {
    setCartContext(personalCart);
    setServiceContext(serviceWallet);
  }
  if (toggleOn) {
    return (
      <div className="TopBar">
        <div className="row-top-bar">
          <div className="col1-top-bar">
            <button
              onClick={() => {
                toggleMenu();
              }}
              className="button-left"
            >
              Menu
            </button>
          </div>
          <div className="col2-top-bar">
            <Link to="/cart">
              <button onClick={() => setCartNecessities()}>cart</button>
            </Link>
          </div>
        </div>
        <div className="row-drop-down">
          <div className="col1-drop-down">
            <ul>
              <li className="row-drop-down">
                <button className="button-drop-down">Home</button>
              </li>
              <Link to="/order">
                <li className="row-drop-down">
                  <button className="button-drop-down">Recent Orders</button>
                </li>
              </Link>
              <Link to="/businessmain">
                <li className="row-drop-down">
                  <button className="button-drop-down">Business Profile</button>
                </li>
              </Link>
              <Link to="/cart">
                <li className="row-drop-down">
                  <button
                    onClick={() => setCartNecessities()}
                    className="button-drop-down"
                  >
                    Cart
                  </button>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row-top-bar">
        <div className="col1-top-bar">
          <button
            onClick={() => {
              toggleMenu();
            }}
            className="button-left"
          >
            Menu
          </button>
        </div>
        <div className="col2-top-bar">
          <Link to="/topup">
            <button>Buy Points</button>&nbsp;&nbsp;
          </Link>
          <Link to="/cart">
            <button onClick={() => setCartNecessities()}>cart</button>
          </Link>
        </div>
      </div>
    );
  }
}
