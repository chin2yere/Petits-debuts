import * as React from "react";
import "./Productcard.css";

export default function ProductCard({
  picture_url,
  name,
  description,
  category,
  price,
}) {
  return (
    <div className="product-card">
      <div className="row-product-card">
        <div className="leftcol-product-card">
          <img src={picture_url} alt="Category picture" />
        </div>
        <div className="rightcol-product-card">
          <div className="row-product-card">
            <h3>{name}</h3>
          </div>
          <div>
            <p>{description}</p>

            <h5>{category}</h5>

            <h3>${price}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
