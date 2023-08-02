import "./Main.css";
import { useState, useEffect, useContext } from "react";
import {
  UserContext,
  CartContext,
  ServiceContext,
  ProductContext,
  OrderContext,
  TrendingContext,
  TotalOtherContext,
} from "../../UserContext.js";
import { Link } from "react-router-dom";
import Trending from "../Trending/Trending";
import Search from "../Search/Search";
import ProductGrid from "../ProductGrid/ProductGrid";
import TopBar from "../TopBar/TopBar";
import Footer from "../Footer/Footer";

function Main() {
  const { user, updateUser } = useContext(UserContext);
  const { productContext, setProductContext } = useContext(ProductContext);
  const { serviceContext, setServiceContext } = useContext(ServiceContext);
  const { cartContext, setCartContext } = useContext(CartContext);
  const { orderContext, setOrderContext } = useContext(OrderContext);
  const { trending, setTrending } = useContext(TrendingContext);
  const { TotalOther, setTotalOther } = useContext(TotalOtherContext);

  const [cart, updateCart] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [personalCart, setPersonalCart] = useState({});
  const [serviceWallet, setServiceWallet] = useState({});
  const [allCarts, setAllCarts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const total = 0.0;

  const [form, setForm] = useState({
    title: "",
    content: "",
    credentials: "include",
  });
  //save orders to memory
  function saveOrderData(data) {
    localStorage.setItem("orderContext", JSON.stringify(data));
  }
  //end
  //save product context data
  function saveProductContext(data) {
    localStorage.setItem("productContext", JSON.stringify(data));
  }
  //end

  useEffect(() => {
    //this function fetches all products
    const fetchAllProducts = async () => {
      const response = await fetch("http://localhost:3000/product");
      const data = await response.json();
      setAllProducts(data);
      setProductContext(data);
      saveProductContext(data);
    };
    //this function fetches the user's cart
    const fetchCart = async (id) => {
      try {
        // Make the fetch cart API request
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

          // Update the cart context
          updateCart(loggedInUserCart);
          setPersonalCart(loggedInUserCart.cart);
        } else {
          // Handle cart access failure case
          alert("Cart access failed");
        }
      } catch (error) {
        // Handle any network or API request errors
        alert("Signup failed: " + error);
      }
    };

    //this function fetches the list of logged in user's past orders
    const fetchOrder = async (id) => {
      try {
        // Make the fetch order API request
        const response = await fetch(`http://localhost:3000/myorder`, {
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
          const loggedInUserOrder = data.userOrder;

          // Update the order context
          setOrderContext(loggedInUserOrder);
          saveOrderData(loggedInUserOrder);
        } else {
          // Handle sorder access failure case
          alert("Order access failed");
        }
      } catch (error) {
        // Handle any network or API request errors
        alert("Order failed: " + error);
      }
    };
    //end
    //this function gets all the carts in the database for the trending algorithm
    const fetchAllCarts = async () => {
      const response = await fetch("http://localhost:3000/cart");
      const data = await response.json();
      setAllCarts(data);
    };
    //end
    //this function gets all the orders in the database for the trending algorithm
    const fetchAllOrders = async () => {
      const response = await fetch("http://localhost:3000/order");
      const data = await response.json();
      setAllOrders(data);
    };
    //end

    fetchAllProducts();
    fetchCart(user.id);
    fetchOrder(user.id);
    fetchAllCarts();
    fetchAllOrders();
  }, []);
  //this function saves the user's cart upon logout
  const saveCart = async (id) => {
    if (
      !(Object.keys(personalCart).length === 0) ||
      !Object.values(personalCart).every((value) => value === null)
    ) {
      try {
        // Make the save cart API request

        const response = await fetch(`http://localhost:3000/cart/delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clearCartValue: personalCart,
            clearCartValueTotal: total,
            id,
          }),
          credentials: "include",
        });
      } catch (error) {
        // Handle any network or API request errors
        alert("order creation failed: " + error);
      }
    }
  };
  //end
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
    saveCart(user.id);
    setTrending({});
    setTotalOther(0);
    localStorage.setItem("trending", JSON.stringify({}));
    localStorage.setItem("TotalOther", String(0));
  };

  //this function filter's products by category
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

  //this function runs search based on name or location
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
                <p>You have {user.money} points |</p>
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
          <Trending
            allCarts={allCarts}
            setAllCarts={setAllCarts}
            allOrders={allOrders}
            setAllOrders={setAllOrders}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            personalCart={personalCart}
          />
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
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Main;
