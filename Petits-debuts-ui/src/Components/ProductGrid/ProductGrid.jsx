import * as React from "react"
import "./ProductGrid.css"
import { useState, useEffect } from "react";
import picture from "../Pictures/business-background.jpeg"

export default function ProductGrid() {
    const [business, setBusiness] = useState([]);
    useEffect(() => {
        const fetchBusiness = async () => {
          const response = await fetch('http://localhost:3000/business');
          const data = await response.json();
          setBusiness(data);
        };
        fetchBusiness();
      }, []);
  return (
    <div className="grid-container">
      {business.map((business) => (
          <div key={business.id}>
             <img className="image"src= {picture}/>
              <h2>{business.location}</h2>
              <h4>By {business.user.name} at {new Date(business.createdAt).toLocaleString()}</h4>
              <p>{business.rating}</p>
          </div>
          ))}
    </div>
  )
}