import * as React from "react";
import { useContext } from "react";
import { OrderContext, ProductContext } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";
import RecentOrderCard from "../RecentOrderCard/RecentOrderCard";
//this page is the recent orders page. it displays the logged in user recent orders
export default function RecentOrders() {
  const { orderContext } = useContext(OrderContext);
  const { productContext } = useContext(ProductContext);
  const navigate = useNavigate();

  const mappedOrders = orderContext.map((order) => {
    return Object.entries(order.order).map(([key, value]) => {
      const product = productContext.find((obj) => {
        if (obj.id.toString() === key) {
          return obj;
        }
      });

      return (
        <div key={key}>
          <RecentOrderCard
            name={product.product_name}
            category={product.category}
          />
        </div>
      );
    });
  });
  return (
    <div>
      <div>{mappedOrders}</div>
      <div>
        <button onClick={() => navigate("/")}>go back to home</button>
      </div>
    </div>
  );
}
