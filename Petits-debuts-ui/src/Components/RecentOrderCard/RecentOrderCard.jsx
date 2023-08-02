import * as React from "react";
import "./RecentOrderCard.css";
import thankYou from "../Pictures/thankYou.png";

export default function RecentOrderCard({ name, category }) {
  return (
    <section className="recentOrderCard">
      <div className="row-recentOrders">
        <div className="col-recentOrders">
          <img src={thankYou} alt="Thank you picture" />
        </div>
        <div className="col2-recentOrders">
          <h5>{name}</h5>
          <h5>{category}</h5>
        </div>
      </div>
    </section>
  );
}
