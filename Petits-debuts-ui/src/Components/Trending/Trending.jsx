import * as React from "react";
import "./Trending.css";
import { OrderContext, UserContext } from "../../UserContext";
import { useState, useContext, useEffect } from "react";

export default function Trending({
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
  const [trending, setTrending] = useState(() => {
    try {
      // Retrieve the product data from storage or set it to null if not found
      const storedtrending = localStorage.getItem("trending");
      return storedtrending ? JSON.parse(storedtrending) : null;
    } catch (error) {
      console.error("Error parsing stored trending:", error);
      return null;
    }
  });
  //this function updates the local storage for trending
  function saveTrendingData(data) {
    localStorage.setItem("trending", JSON.stringify(data));
  }

  //This function creates the skelenton of the trending
  useEffect(() => {
    //create the skeleton
    function createTrendingFormat() {
      const tempTrending = { ...trending };

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
          recent: 0,
          like: getLikes(product),
          location: getLocation(product),
          others: 0,
          cart: 0,
        };

        tempTrending[keys] = tempObject;
      });
      setTrending(tempTrending);
      saveTrendingData(tempTrending);
    }

    createTrendingFormat();
  }, []);
  //use effect for orders
  useEffect(() => {
    function loopThroughOrders(top50, order, tempTrending) {
      Object.entries(order.order).map(([key, value]) => {
        const b = key;
        if (value != 0) {
          if (top50) {
            tempTrending[key].recent = 15;
          } else {
            tempTrending[key].recent = 10;
          }
        }
      });
    }
    function addRecentScore(tempTrending) {
      let top50 = true;

      for (let i = 0; i < orderContext.length; i++) {
        if (i > orderContext.length / 2) {
          top50 = false;
        }
        loopThroughOrders(top50, orderContext[i], tempTrending);
      }
      setTrending(tempTrending);
      saveTrendingData(tempTrending);
    }

    if (trending) {
      const tempTrending2 = { ...trending };
      addRecentScore(tempTrending2);
    }
  }, []);

  //end
  //useEffect for cart
  useEffect(() => {
    function loopThroughCart(personalCart, tempTrending) {
      Object.entries(personalCart).map(([key, value]) => {
        if (value != 0) {
          tempTrending[key].cart = 25;
        }
      });
    }
    function addCartScore(tempTrending) {
      loopThroughCart(personalCart, tempTrending);
      setTrending(tempTrending);
      saveTrendingData(tempTrending);
    }

    if (trending) {
      const tempTrending2 = { ...trending };
      addCartScore(tempTrending2);
    }
  }, []);
  //end

  return (
    <div className="trending">
      <div className="card-trending">
        <p>{console.log({ trending })}</p>
      </div>
    </div>
  );
}
