import * as React from "react";
import "./Cart.css";
import { useState, useEffect, useContext } from "react";
import {
  UserContext,
  CartContext,
  ServiceContext,
  ProductContext,
} from "../../UserContext.js";

export default function Cart() {
  const { productContext } = useContext(ProductContext);
  const { serviceContext, setServiceContext } = useContext(ServiceContext);
  const { cartContext, setCartContext } = useContext(CartContext);
  const { user } = useContext(UserContext);

  return (
    <div className="cart">
      <p>Cart</p>
    </div>
  );
}
