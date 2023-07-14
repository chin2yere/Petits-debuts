import * as React from "react";
import "./Productcard.css";
import CardButtons from "../CardButtons/CardButtons";

export default function ProductCard({
  picture_url,
  name,
  description,
  category,
  price,
  id,
  service,
  cart,
  updateCart,
  personalCart,
  setPersonalCart,
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
      <div className="row-product-card">
        <CardButtons
          id={id}
          service={service}
          cart={cart}
          updateCart={updateCart}
          personalCart={personalCart}
          setPersonalCart={setPersonalCart}
        />
      </div>
    </div>
  );
}
