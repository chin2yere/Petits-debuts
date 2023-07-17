import * as React from "react";
import "./Cart.css";
import { useState, useEffect, useContext } from "react";
import {
  UserContext,
  CartContext,
  ServiceContext,
  ProductContext,
  TotalContext,
} from "../../UserContext.js";
import CartCard from "../CartCard/CartCard";
import clothesAndShoes from "../Pictures/clothes-and-shoes.png";
import customProduct from "../Pictures/custom-products.png";
import food from "../Pictures/food.avif";
import hairAndNails from "../Pictures/hair-and-nails.jpg";
import photography from "../Pictures/photography.jpeg";
import tutoring from "../Pictures/tutoring.jpg";
import { Link } from "react-router-dom";

export default function Cart() {
  const { productContext } = useContext(ProductContext);
  const { serviceContext, setServiceContext } = useContext(ServiceContext);
  const { cartContext, setCartContext } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { totalContext, setTotalContext } = useContext(TotalContext);

  const [serviceTab, setServiceTab] = useState(false);

  let grandTotal = 0;
  let grandTotalService = 0;

  function saveCartData(data) {
    localStorage.setItem("productContext", JSON.stringify(data.productContext));
    localStorage.setItem("serviceContext", JSON.stringify(data.serviceContext));
    localStorage.setItem("cartContext", JSON.stringify(data.cartContext));
  }

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    saveCartData({ productContext, serviceContext, cartContext });
  }, [productContext, serviceContext, cartContext]);

  function setProductUrl(category) {
    if (category === "Custom Products") {
      return customProduct;
    } else if (category === "Tutoring") {
      return tutoring;
    } else if (category === "Food") {
      return food;
    } else if (category === "Photography") {
      return photography;
    } else if (category === "Hair & nails") {
      return hairAndNails;
    } else if (category === "Clothes & shoes") {
      return clothesAndShoes;
    }
  }
  function serviceTabFunction(service) {
    setServiceTab(service);
  }

  if (serviceTab) {
    // if service tab is empty
    if (
      Object.keys(serviceContext).length === 0 ||
      Object.values(serviceContext).every((value) => value === null)
    ) {
      return (
        <div className="cart">
          <div className="row-cart">
            <button
              onClick={() => serviceTabFunction(false)}
              className="button-cart"
            >
              Goods
            </button>
            <button
              onClick={() => serviceTabFunction(true)}
              className="button-cart"
            >
              Service
            </button>
          </div>
          <h2>You have no selected services</h2>
        </div>
      );
    } else {
      // if not empty
      return (
        <div className="cart">
          <div className="row-cart">
            <button
              onClick={() => serviceTabFunction(false)}
              className="button-cart"
            >
              Goods
            </button>
            <button
              onClick={() => serviceTabFunction(true)}
              className="button-cart"
            >
              Service
            </button>
          </div>
          <div>
            {Object.entries(serviceContext).map(([key, value]) => {
              if (value) {
                const product = productContext.find((obj) => {
                  if (obj.id.toString() === key) {
                    return obj;
                  }
                });

                grandTotalService = grandTotalService + product.price;

                return (
                  <CartCard
                    key={product.id}
                    picture_url={setProductUrl(product.category)}
                    name={product.product_name}
                    price={product.price}
                    quantity={null}
                    date={value}
                    total={product.price}
                  />
                );
              }
            })}
          </div>
          <div className="checkout-cart">
            <h3>Total Cost: ${grandTotalService}</h3>
            <Link to="/checkoutservices">
              <button onClick={() => setTotalContext(grandTotalService)}>
                Checkout
              </button>
            </Link>
          </div>
        </div>
      );
    }
  } else {
    if (
      Object.keys(cartContext).length === 0 ||
      Object.values(cartContext).every((value) => value === 0)
    ) {
      return (
        <div className="cart">
          <div className="row-cart">
            <button
              onClick={() => serviceTabFunction(false)}
              className="button-cart"
            >
              Goods
            </button>
            <button
              onClick={() => serviceTabFunction(true)}
              className="button-cart"
            >
              Service
            </button>
          </div>
          <h2>You have no Items in your cart</h2>
        </div>
      );
    } else {
      return (
        <div className="cart">
          <div className="row-cart">
            <button
              onClick={() => serviceTabFunction(false)}
              className="button-cart"
            >
              Goods
            </button>
            <button
              onClick={() => serviceTabFunction(true)}
              className="button-cart"
            >
              Service
            </button>
          </div>
          <div>
            {Object.entries(cartContext).map(([key, value]) => {
              if (value != 0) {
                const product = productContext.find((obj) => {
                  if (obj.id.toString() === key) {
                    return obj;
                  }
                });

                grandTotal = grandTotal + product.price * value;

                return (
                  <CartCard
                    key={product.id}
                    picture_url={setProductUrl(product.category)}
                    name={product.product_name}
                    price={product.price}
                    quantity={value}
                    date={null}
                    total={product.price * value}
                  />
                );
              }
            })}
          </div>
          <div className="checkout-cart">
            <h3>Total Cost: ${grandTotal}</h3>
            <Link to="/checkoutcart">
              <button onClick={() => setTotalContext(grandTotal)}>
                Checkout
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }
}
