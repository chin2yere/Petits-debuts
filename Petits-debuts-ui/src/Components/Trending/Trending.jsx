import * as React from "react";
import "./Trending.css";
import {
  OrderContext,
  UserContext,
  TrendingContext,
  TotalOtherContext,
  ProductContext,
} from "../../UserContext";
import { useState, useContext, useEffect } from "react";
import trendingpic from "../Pictures/Trending-.jpg";
//technical challenge 1

//this page creates an algorithm that recommends products to users based on five pillars of product recommendability

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
  const { trending, setTrending } = useContext(TrendingContext);
  const { productContext } = useContext(ProductContext);
  const { TotalOther, setTotalOther } = useContext(TotalOtherContext);
  const thresholdMinimumScore = 70;

  function saveTotalOtherData(data) {
    localStorage.setItem("TotalOther", String(data));
  }
  function saveTrendingData(data) {
    localStorage.setItem("trending", JSON.stringify(data));
  }
  function calculateOtherScore(score) {
    const reference = allCarts.length + allOrders.length;
    if (score / reference >= 0.3) {
      return 20;
    } else if (score / reference >= 0.2) {
      return 15;
    } else if (score / reference >= 0.1) {
      return 10;
    } else if (score / reference >= 0) {
      return 5;
    } else {
      return 0;
    }
  }

  //This function creates the skelenton of the trending
  //this is the first useeffect
  useEffect(() => {
    //create the skeleton

    function createTrendingFormat() {
      const tempTrending = {};

      function getLikes(product) {
        if (
          product.likes.hasOwnProperty(user.id) &&
          product.likes[user.id] === true
        ) {
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

      productContext.forEach((product) => {
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
  }, [productContext]);

  //This useeffect was done to help keep track of trending

  useEffect(() => {
    console.log("trending has been updated:", trending);
  }, [trending]);

  //this is the useeffect for orders  //it is the second one
  useEffect(() => {
    function loopThroughOrders(top50, order, tempTrending) {
      Object.entries(order.order).map(([key, value]) => {
        if (value != 0) {
          if (top50) {
            if (tempTrending[key].recent === 0) {
              tempTrending[key].recent = 15;
            }
          } else {
            if (tempTrending[key].recent === 0) {
              tempTrending[key].recent = 10;
            }
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
      setTrending({ ...tempTrending });
      saveTrendingData({ ...tempTrending });
    }

    if (trending && Object.keys(trending).length != 0) {
      const tempTrending2 = { ...trending };
      addRecentScore(tempTrending2);
    }
  }, [productContext]);

  //end
  // useEffect for cart // it is the third one
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
      setTrending({ ...tempTrending });
      saveTrendingData({ ...tempTrending });
    }

    if (trending && Object.keys(trending).length != 0) {
      const tempTrending2 = { ...trending };
      addCartScore(tempTrending2);
    }
  }, [productContext]);
  //end
  //useEffect for other carts and orders
  useEffect(() => {
    let totalOthers = TotalOther;
    //set all to zero
    function setAllOthersToZero(tempTrending) {
      Object.entries(tempTrending).map(([key, value]) => {
        tempTrending[key].others = 0;
      });
    }
    //cart
    function loopThroughCart(cart, tempTrending) {
      Object.entries(cart).map(([key, value]) => {
        if (value != 0) {
          tempTrending[key].others += 1;
          totalOthers += 1;
        }
      });
    }
    function loopThroughOtherCarts(tempTrending) {
      allCarts.map((cart) => {
        loopThroughCart(cart.cart, tempTrending);
      });
    }
    //orders
    function loopThroughOrder(order, tempTrending) {
      Object.entries(order).map(([key, value]) => {
        if (value != 0) {
          tempTrending[key].others += 1;
          totalOthers += 1;
        }
      });
    }
    function loopThroughOtherOrders(tempTrending) {
      allOrders.map((order) => {
        loopThroughOrder(order.order, tempTrending);
      });
      setTrending({ ...tempTrending });
    }

    if (
      (trending && Object.keys(trending).length != 0 && TotalOther === 0) ||
      (!TotalOther && trending && Object.keys(trending).length != 0) ||
      (TotalOther != 0 &&
        TotalOther != null &&
        trending &&
        Object.keys(trending).length != 0)
    ) {
      const tempTrending2 = { ...trending };
      setAllOthersToZero(tempTrending2);
      loopThroughOtherCarts(tempTrending2);
      loopThroughOtherOrders(tempTrending2);
      setTotalOther(totalOthers);
      saveTotalOtherData(totalOthers);
    }
  }, [productContext]);
  // // //end
  return (
    <div className="trending">
      <div className="card-trending">
        {trending &&
          Object.entries(trending).map(([key, value]) => {
            let score =
              value.recent +
              value.location +
              value.like +
              value.cart +
              calculateOtherScore(value.others);
            //logic for exceptions
            //typically each product is rated on a score out of 120
            //but an absence of one or more pillar can reduce the total score to as low as 80
            //we have to scale up to 120 regardless because our threshold mark is 70
            if (
              Object.keys(personalCart).length === 0 &&
              orderContext.length !== 0
            ) {
              //this part scales up the score to 120 from 80
              score = (score * 120) / 95;
            } else if (
              Object.keys(personalCart).length !== 0 &&
              orderContext.length === 0
            ) {
              //this part scales up the score to 120 from 105
              score = (score * 120) / 105;
            } else if (
              Object.keys(personalCart).length === 0 &&
              orderContext.length === 0
            ) {
              //this part scales up the score to 120 from 80
              score = (score * 120) / 80;
            }
            if (score >= thresholdMinimumScore) {
              const product = productContext.find((obj) => {
                if (obj.id.toString() === key) {
                  return obj;
                }
              });

              return (
                <div className="row-trending" key={product.id}>
                  <div className="leftcol-trending">
                    <img
                      className="image-trending"
                      src={trendingpic}
                      alt="trending picture"
                    />
                  </div>
                  <div className="rightcol-trending">
                    <h2>{product.product_name}</h2>
                    <h3>{product.category}</h3>
                    <h4>${product.price}</h4>
                    <p>Scroll down to use the search bar</p>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
