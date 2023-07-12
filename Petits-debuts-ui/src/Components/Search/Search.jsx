import * as React from "react";
import "./Search.css";
import { useState, useEffect } from "react";

export default function Search({
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
}) {
  const [filterOn, setFilterOn] = useState(false);
  const [filterButtonColor, setFilterButtonColor] = useState("filter-button");
  function checkFilter() {
    if (filterOn === true) {
      setFilterOn(false);
      setFilterButtonColor("filter-button");
    } else if (filterOn === false) {
      setFilterOn(true);
      setFilterButtonColor("filter-button-active");
    }
  }
  //button color manipulation. this could be done better
  let allbtn = "li-button";
  let custombtn = "li-button";
  let tutorbtn = "li-button";
  let hairbtn = "li-button";
  let clothbtn = "li-button";
  let foodbtn = "li-button";
  let photobtn = "li-button";

  if (selectedCategory === "All categories") {
    allbtn = "li-button-active";
  } else if (selectedCategory === "Custom Products") {
    custombtn = "li-button-active";
  } else if (selectedCategory === "Tutoring") {
    tutorbtn = "li-button-active";
  } else if (selectedCategory === "Hair & nails") {
    hairbtn = "li-button-active";
  } else if (selectedCategory === "Clothes & shoes") {
    clothbtn = "li-button-active";
  } else if (selectedCategory === "Food") {
    foodbtn = "li-button-active";
  } else if (selectedCategory === "Photography") {
    photobtn = "li-button-active";
  }

  if (filterOn) {
    return (
      <div className="search">
        <div className="row-search">
          <input
            className="searchBar"
            type="text"
            placeholder="type here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="searchBarButton">Search</button>
          <button onClick={() => checkFilter()} className={filterButtonColor}>
            Filter
          </button>
        </div>
        <div className="row-search">
          <ul>
            <li className="label-search">
              <h3>Filter by category</h3>
            </li>
            <li>
              <button
                className={allbtn}
                onClick={() => {
                  setSelectedCategory("All categories");
                }}
              >
                All categories
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory("Custom Products");
                }}
                className={custombtn}
              >
                Custom products
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory("Tutoring");
                }}
                className={tutorbtn}
              >
                Tutoring
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory("Hair & nails");
                }}
                className={hairbtn}
              >
                Hair & nails
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory("Clothes & shoes");
                }}
                className={clothbtn}
              >
                Clothes & shoes
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory("Food");
                }}
                className={foodbtn}
              >
                Food
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory("Photography");
                }}
                className={photobtn}
              >
                Photography
              </button>
            </li>
          </ul>
        </div>
        {/* location */}
        {/* <div className="row-search">
          <ul>
            <li className="label-search">
              <h3>Filter by location</h3>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedLocation("All locations");
                }}
              >
                All locations
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedLocation("Pennsylvania");
                }}
              >
                Pennsylvania
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedLocation("New York");
                }}
              >
                New York
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedLocation("Delaware");
                }}
              >
                Delaware
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedLocation("Baltimore");
                }}
              >
                Baltimore
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedLocation("Maryland");
                }}
              >
                Maryland
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedLocation("New jersey");
                }}
              >
                New Jersey
              </button>
            </li>
          </ul>
        </div> */}
      </div>
    );
  } else {
    return (
      <div className="search">
        <div className="row-search">
          <input
            className="searchBar"
            type="text"
            placeholder="type here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="searchBarButton">Search</button>
          <button onClick={() => checkFilter()} className={filterButtonColor}>
            Filter
          </button>
        </div>
      </div>
    );
  }
}
