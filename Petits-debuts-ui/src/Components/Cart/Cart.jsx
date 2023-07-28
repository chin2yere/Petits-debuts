import * as React from "react";
import "./Cart.css";
import { useState, useEffect, useContext } from "react";
import {
  UserContext,
  CartContext,
  ServiceContext,
  ProductContext,
  TotalContext,
  MoneyUpdateContext,
  CheckoutTypeContext,
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
  const { checkoutTypeContext, setCheckoutTypeContext } =
    useContext(CheckoutTypeContext);
  const { moneyUpdateContext, setMoneyUpdateContext } =
    useContext(MoneyUpdateContext);

  const [serviceTab, setServiceTab] = useState(false);

  let grandTotal = 0;
  let grandTotalService = 0;
  let tempMoneyContext = {};

  function whereToNavigate(grandTotal) {
    const totalPoints = grandTotal.toFixed(2) * 100;
    if (user.money >= totalPoints) {
      let link1 = "";
      if (checkoutTypeContext === "goods") {
        link1 = "/checkoutcart";
      } else if (checkoutTypeContext === "service") {
        link1 = "/checkoutservices";
      }

      return link1;
    } else {
      const link = "/buyPoints";
      return link;
    }
  }

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
          <div>{setCheckoutTypeContext("service")}</div>
          <div>
            {Object.entries(serviceContext).map(([key, value]) => {
              if (value) {
                const product = productContext.find((obj) => {
                  if (obj.id.toString() === key) {
                    return obj;
                  }
                });
                const eyed = product.business.userId;
                const tempval = product.price.toFixed(2) * 100;
                if (eyed in tempMoneyContext) {
                  tempMoneyContext[eyed] += tempval;
                } else {
                  tempMoneyContext = { ...tempMoneyContext, [eyed]: tempval };
                }

                grandTotalService = grandTotalService + product.price;

                return (
                  <CartCard
                    key={product.id}
                    picture_url={setProductUrl(product.category)}
                    name={product.product_name}
                    price={product.price}
                    quantity={null}
                    date={value}
                    total={product.price.toFixed(2)}
                  />
                );
              }
            })}
          </div>
          <div className="checkout-cart">
            <div>{console.log(tempMoneyContext)}</div>
            <h3>Total Cost: ${grandTotalService.toFixed(2)}</h3>
            <Link to={whereToNavigate(grandTotalService)}>
              <button
                onClick={() => {
                  setTotalContext(grandTotalService.toFixed(2));
                  setMoneyUpdateContext(tempMoneyContext);
                }}
              >
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
          <div>{setCheckoutTypeContext("goods")}</div>

          <div>
            {Object.entries(cartContext).map(([key, value]) => {
              if (value != 0) {
                const product = productContext.find((obj) => {
                  if (obj.id.toString() === key) {
                    return obj;
                  }
                });
                const eyed = product.business.userId;
                const tempval = (product.price * value).toFixed(2) * 100;
                if (eyed in tempMoneyContext) {
                  tempMoneyContext[eyed] += tempval;
                } else {
                  tempMoneyContext = { ...tempMoneyContext, [eyed]: tempval };
                }

                grandTotal = grandTotal + product.price * value;

                return (
                  <CartCard
                    key={product.id}
                    picture_url={setProductUrl(product.category)}
                    name={product.product_name}
                    price={product.price}
                    quantity={value}
                    date={null}
                    total={(product.price * value).toFixed(2)}
                  />
                );
              }
            })}
          </div>
          <div className="checkout-cart">
            <div>{console.log(tempMoneyContext)}</div>
            <h3>Total Cost: ${grandTotal.toFixed(2)}</h3>
            <Link to={whereToNavigate(grandTotal)}>
              <button
                onClick={() => {
                  setTotalContext(grandTotal.toFixed(2));
                  setMoneyUpdateContext(tempMoneyContext);
                }}
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }
}
