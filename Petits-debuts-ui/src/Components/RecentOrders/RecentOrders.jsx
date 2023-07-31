import * as React from "react";
import "./RecentOrders.css";
import { OrderContext } from "../../UserContext";

export default function RecentOrders() {
  const { orderContext, setOrderContext } = useContext();

  return (
    <div className="recentOrders">
      <p>recentOrders</p>
    </div>
  );
}
