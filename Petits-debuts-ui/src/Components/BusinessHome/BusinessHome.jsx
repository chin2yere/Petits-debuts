import * as React from "react";
import "./BusinessHome.css";
import { useState, useEffect, useContext } from "react";
import { UserContext, IdContext } from "../../UserContext.js";
import businessPicture from "../Pictures/business-background.jpeg";
import BusinessProduct from "../BusinessProduct/BusinessProduct";
import { Link, useNavigate } from "react-router-dom";

export default function BusinessHome() {
  const { user } = useContext(UserContext);
  const [businesses, setBusinesses] = useState([]);
  const { setIdContext } = useContext(IdContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBusiness = async (id) => {
      try {
        // Make the signup API request
        const response = await fetch(`http://localhost:3000/mybusiness`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          const loggedInUserBusiness = data.userBusiness;
          setBusinesses(loggedInUserBusiness);
          console.log(loggedInUserBusiness);
        } else {
          // Handle signup failure case
          alert("Business access failed");
        }
      } catch (error) {
        // Handle any network or API request errors
        alert("Business access failed: " + error);
      }
    };
    fetchBusiness(user.id);
  }, []);
  return (
    <div className="BusinessHome">
      {businesses.length !== 0 &&
        businesses.map((business) => {
          return (
            <div key={business.id} className="business-card">
              <div className="row-business-card">
                {" "}
                <img
                  className="img-business"
                  src={businessPicture}
                  alt="Business picture"
                />
              </div>
              <div className="row-business-card">
                <h2>{business.name}</h2>
              </div>
              <div className="row-business-card">
                <h2>Products</h2>
              </div>
              <div className="row-business-card">
                <BusinessProduct id={business.id} />
              </div>
            </div>
          );
        })}
      <div>
        <button
          onClick={() => {
            navigate("/businessForm");
            setIdContext(user.id);
          }}
          className="button-business-card"
        >
          create new business
        </button>
      </div>
      <div>
        <br />
        <br />

        <button className="button-business-home" onClick={() => navigate("/")}>
          go to home page
        </button>
      </div>
    </div>
  );
}
