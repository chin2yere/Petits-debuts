import * as React from "react";
import "./BusinessProduct.css";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IdContext } from "../../UserContext";

export default function BusinessProduct({ id }) {
  const [businessProduct, setBusinessProduct] = useState([]);
  const { setIdContext } = useContext(IdContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        // Make the signup API request
        const response = await fetch(
          `http://localhost:3000/mybusiness/product`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
            }),
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          const loggedInUserProduct = data.userBusinessProduct;
          setBusinessProduct(loggedInUserProduct);
          //console.log(loggedInUserBusiness);
        } else {
          // Handle signup failure case
          alert("Product access failed");
        }
      } catch (error) {
        // Handle any network or API request errors
        alert("Product access failed: " + error);
      }
    };
    fetchProduct(id);
  }, []);
  return (
    <section className="businessProduct">
      {businessProduct.map((product) => {
        return (
          <div className="row-business-product" key={product.id}>
            <h3>{product.product_name}</h3>
            <h2>unit price: ${product.price}</h2>
            <h3>{product.category}</h3>
          </div>
        );
      })}
      <div>
        <button
          onClick={() => {
            navigate("/productForm");
            setIdContext(id);
          }}
          className="button-business-product-card"
        >
          create new product
        </button>
      </div>
    </section>
  );
}
