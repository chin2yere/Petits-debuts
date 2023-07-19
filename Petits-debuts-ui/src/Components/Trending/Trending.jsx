import * as React from "react";
import "./Trending.css";
import { OrderContext, UserContext } from "../../UserContext";
import { useState, useContext, useEffect } from "react";

export default function Trending({
  trending,
  setTrending,
  allCarts,
  setAllCarts,
  allOrders,
  setAllOrders,
  allProducts,
  setAllProducts,
  personalCart,
}) {
  const { orderContext, setOrderContext } = useContext(OrderContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    //create the skeleton
    function createTrendingFormat() {
      let tempTrending = {};
      allProducts.map((product) => {
        function getLikes(product) {
          if (product.likes.hasOwnProperty(user.id) && product.likes[user.id]) {
            return 40;
          } else {
            return 0;
          }
        }
        function getLocation(product) {
          if (user.location === product.business.location) {
            return 20;
          } else {
            return 0;
          }
        }
        const keys = product.id;
        const tempObject = {
          [keys]: {
            recent: 0,
            like: getLikes(product),
            location: getLocation(product),
            others: 0,
            cart: 0,
          },
        };
        //console.log(tempObject);
        tempTrending[keys] = tempObject;
        //console.log(tempTrending);
      });
      setTrending(tempTrending);
    }
    createTrendingFormat();
  }, []);
  console.log({ trending });
  return (
    <div className="trending">
      <div className="card-trending">
        <p>Technical challenge</p>
      </div>
    </div>
  );
}
