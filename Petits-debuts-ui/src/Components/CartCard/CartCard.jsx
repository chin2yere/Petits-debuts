import * as React from "react";
import "./CartCard.css";

export default function CartCard({
  picture_url,
  name,
  price,
  quantity,
  date,
  total,
}) {
  if (date) {
    return (
      <div className="cart-card">
        <div className="row-cart-card">
          <div className="leftcol-cart-card">
            <img src={picture_url} alt="Category picture" />
          </div>
          <div className="rightcol-cart-card">
            <h3>{name}</h3>
            <h4>${price}</h4>
            <h5>{date.substring(0, 19).replace("T", " ")}</h5>
            <h3>${total}</h3>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cart-card">
        <div className="row-cart-card">
          <div className="leftcol-cart-card">
            <img src={picture_url} alt="Category picture" />
          </div>
          <div className="rightcol-cart-card">
            <h3>{name}</h3>
            <h4>${price}</h4>
            <h5>{quantity}</h5>
            <h3>${total}</h3>
          </div>
        </div>
      </div>
    );
  }
}
