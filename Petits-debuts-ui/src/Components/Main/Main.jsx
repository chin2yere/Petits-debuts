import "./Main.css";
import { useState, useEffect, useContext } from "react";
import {
  UserContext,
  CartContext,
  ServiceContext,
  ProductContext,
} from "../../UserContext.js";
import { Link } from "react-router-dom";
import Trending from "../Trending/Trending";
import Search from "../Search/Search";
import ProductGrid from "../ProductGrid/ProductGrid";
import TopBar from "../TopBar/TopBar";

function Main() {
  const { user, updateUser } = useContext(UserContext);
  const { productContext, setProductContext } = useContext(ProductContext);
  const { serviceContext, setServiceContext } = useContext(ServiceContext);
  const { cartContext, setCartContext } = useContext(CartContext);

  const [cart, updateCart] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [personalCart, setPersonalCart] = useState({});
  const [serviceWallet, setServiceWallet] = useState({});

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
      setProductContext(data);
    };
    const fetchCart = async (id) => {
      try {
        // Make the signup API request
        const response = await fetch(`http://localhost:3000/mycart`, {
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
          const loggedInUserCart = data.usercart;

          console.log("Cart access successful");

          // Update the user context
          updateCart(loggedInUserCart);
          setPersonalCart(loggedInUserCart.cart);
        } else {
          // Handle signup failure case
          alert("Cart access failed");
        }
      } catch (error) {
        // Handle any network or API request errors
        alert("Signup failed: " + error);
      }
    };

    fetchAllProducts();
    fetchCart(user.id);
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
    updateCart({});
    setAllProducts([]);
    setProduct([]);
    setProductContext([]);
    setCartContext({});
    setServiceContext({});
    setServiceWallet({});
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

      setProduct(newProduct);
    } else if (text === "") {
      setProduct(allProducts);
    }
  }

  return (
    <div className="main">
      <div className="topBar">
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
        <TopBar personalCart={personalCart} serviceWallet={serviceWallet} />
      </div>
      <div className="content">
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
            cart={cart}
            updateCart={updateCart}
            personalCart={personalCart}
            setPersonalCart={setPersonalCart}
            serviceWallet={serviceWallet}
            setServiceWallet={setServiceWallet}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
