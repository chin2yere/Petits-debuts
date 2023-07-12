import "./Main.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext.js";
import { Link } from "react-router-dom";
import Trending from "../Trending/Trending";
import Search from "../Search/Search";
import ProductGrid from "../ProductGrid/ProductGrid";

function Main() {
  const { user, updateUser } = useContext(UserContext);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    credentials: "include",
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await fetch("http://localhost:3000/product");
      const data = await response.json();
      setAllProducts(data);
    };
    fetchAllProducts();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/business", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include",
    });
    const newBusiness = await response.json();
    setBusiness([newBusiness, ...business]);
  };

  const handleLogout = () => {
    // Perform logout logic here
    // Example: Clear user data from localStorage, reset user state, etc.
    updateUser(null);
  };

  //filter by category
  function filterProductsByCategory(data, category) {
    const filteredData = data.filter((data) => {
      if (data.category === category || category === "All categories") {
        return true;
      } else {
        return false;
      }
    });
    return filteredData;
  }
  //filter by location
  function filterProductsByLocation(data, location) {
    const filteredData = data.filter((data) => {
      if (data.location === location || location === "All locations") {
        return true;
      } else {
        return false;
      }
    });
    return filteredData;
  }
  //search based on name or location
  function runSearch(text) {
    if (text != "") {
      const inputText = text.toLowerCase();
      const newProduct = allProducts.filter((product) => {
        if (
          product.product_name.toLowerCase().includes(inputText) ||
          product.business.location.toLowerCase().includes(inputText)
        ) {
          return true;
        } else {
          return false;
        }
      });
      console.log(newProduct);
      setProduct(newProduct);
    } else if (text === "") {
      setProduct(allProducts);
    }
  }

  return (
    <div className="main">
      <header className="header">
        <div className="user-info">
          {user ? (
            <>
              <span>Hi {user.name}! |</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </header>
      <div className="row-trending-main">
        <Trending />
      </div>
      <div className="row-search-main">
        <Search
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          search={search}
          setSearch={setSearch}
          runSearch={runSearch}
        />
      </div>
      <div>
        <ProductGrid
          product={product}
          setProduct={setProduct}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filterProductsByCategory={filterProductsByCategory}
        />
      </div>
    </div>
  );
}

export default Main;
