import * as React from "react";
import "./ProductGrid.css";
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import clothesAndShoes from "../Pictures/clothes-and-shoes.png";
import customProduct from "../Pictures/custom-products.png";
import food from "../Pictures/food.avif";
import hairAndNails from "../Pictures/hair-and-nails.jpg";
import photography from "../Pictures/photography.jpeg";
import tutoring from "../Pictures/tutoring.jpg";

export default function ProductGrid({
  product,
  setProduct,
  selectedCategory,
  setSelectedCategory,
  filterProductsByCategory,
}) {
  //const [url, setUrl] = useState("");
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("http://localhost:3000/product");
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, []);
  console.log(product);
  function setProductUrl(category) {
    if (category === "Custom Products") {
      return customProduct;
    } else if (category === "Tutoring") {
      return tutoring;
    } else if (category === "Food") {
      return food;
    } else if (category === "Photography") {
      return photography;
    } else if (category === "Hair & nails") {
      return hairAndNails;
    } else if (category === "Clothes & shoes") {
      return clothesAndShoes;
    }
  }
  return (
    <div className="grid-container">
      {filterProductsByCategory(product, selectedCategory).map((product) => (
        <div key={product.id}>
          <ProductCard
            picture_url={setProductUrl(product.category)}
            name={product.product_name}
            description={product.description}
            category={product.category}
            price={product.price}
          />
        </div>
      ))}
    </div>
  );
}
