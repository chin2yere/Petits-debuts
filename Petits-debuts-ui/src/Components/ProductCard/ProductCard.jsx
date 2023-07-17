import * as React from "react";
import "./Productcard.css";
import CardButtons from "../CardButtons/CardButtons";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState, useContext } from "react";
import { UserContext } from "../../UserContext";

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
  availability,
  serviceWallet,
  setServiceWallet,
  likes,
}) {
  const { user } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(() => {
    if (likes[user.id] && likes[user.id] === true) {
      return true;
    } else {
      return false;
    }
  });
  function isLikedFunction() {
    if (isLiked) {
      return (
        <h2>
          {" "}
          <AiFillHeart />
        </h2>
      );
    } else {
      return (
        <h2>
          {" "}
          <AiOutlineHeart />
        </h2>
      );
    }
  }
  ///start

  const updateProductLikes = async (value) => {
    const tempLikes = { ...likes };
    tempLikes[user.id] = value;

    try {
      // Make the signup API request

      const response = await fetch(`http://localhost:3000/likes/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tempLikes,
          id,
        }),
        credentials: "include",
      });
    } catch (error) {
      // Handle any network or API request errors
      alert("like update creation failed: " + error);
    }
  };

  //end
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
            <button
              onClick={() => {
                setIsLiked(!isLiked);
                updateProductLikes(!isLiked);
              }}
            >
              {isLikedFunction()}
            </button>
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
          availability={availability}
          serviceWallet={serviceWallet}
          setServiceWallet={setServiceWallet}
        />
      </div>
    </div>
  );
}
