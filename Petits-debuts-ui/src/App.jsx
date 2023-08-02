import "./App.css";
import { useState, useEffect } from "react";
import {
  UserContext,
  CartContext,
  ServiceContext,
  ProductContext,
  TotalContext,
  OrderContext,
  TrendingContext,
  TotalOtherContext,
  MoneyUpdateContext,
  CheckoutTypeContext,
  IdContext,
} from "./UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Components/Main/Main";
import LoginForm from "./Components/LoginForm/LoginForm";
import SignupForm from "./Components/SignupForm/SignupForm";
import BusinessHome from "./Components/BusinessHome/BusinessHome";
import Cart from "./Components/Cart/Cart";
import RecentOrders from "./Components/RecentOrders/RecentOrders";
import CheckoutCart from "./Components/CheckoutCart/CheckoutCart";
import CheckoutServices from "./Components/CheckoutServices/CheckoutServices";
import PayPal from "./Components/PayPal/PayPal";
import Success from "./Components/Success/Success";
import PointsTopUp from "./Components/PointsTopUp/PointsTopUp";
import BusinessForm from "./Components/BusinessForm/Business.form";
import ProductForm from "./Components/ProductForm/ProductForm";
function App() {
  const [totalContext, setTotalContext] = useState(0);
  const [idContext, setIdContext] = useState(() => {
    try {
      // Retrieve the id context data from storage or set it to null if not found
      const storedid = localStorage.getItem("idContext");
      return storedid ? parseInt(storedid, 10) : null;
    } catch (error) {
      console.error("Error parsing stored id:", error);
      return null;
    }
  });

  const [checkoutTypeContext, setCheckoutTypeContext] = useState(() => {
    try {
      // Retrieve the checkout type data from storage or set it to null if not found
      const storedtype = localStorage.getItem("checkoutTypeContext");
      return storedtype ? parseInt(storedother, 10) : null;
    } catch (error) {
      console.error("Error parsing stored type:", error);
      return null;
    }
  });
  const [moneyUpdateContext, setMoneyUpdateContext] = useState(() => {
    try {
      // Retrieve the money update data from storage or set it to null if not found
      const storedmoney = localStorage.getItem("moneyUpdateContext");
      return storedmoney ? JSON.parse(storedmoney) : null;
    } catch (error) {
      console.error("Error parsing stored money:", error);
      return null;
    }
  });
  const [TotalOther, setTotalOther] = useState(() => {
    try {
      // Retrieve the total other data from storage or set it to null if not found
      const storedother = localStorage.getItem("TotalOther");
      return storedother ? parseInt(storedother, 10) : null;
    } catch (error) {
      console.error("Error parsing stored other:", error);
      return null;
    }
  });
  const [trending, setTrending] = useState(() => {
    try {
      // Retrieve the trending data from storage or set it to null if not found
      const storedtrending = localStorage.getItem("trending");
      return storedtrending ? JSON.parse(storedtrending) : null;
    } catch (error) {
      console.error("Error parsing stored trending:", error);
      return null;
    }
  });
  const [orderContext, setOrderContext] = useState(() => {
    try {
      // Retrieve the order data from storage or set it to null if not found
      const storedOrder = localStorage.getItem("orderContext");
      return storedOrder ? JSON.parse(storedOrder) : null;
    } catch (error) {
      console.error("Error parsing stored order:", error);
      return null;
    }
  });

  const [cartContext, setCartContext] = useState(() => {
    try {
      // Retrieve the cart data from storage or set it to null if not found
      const storedCart = localStorage.getItem("cartContext");
      return storedCart ? JSON.parse(storedCart) : null;
    } catch (error) {
      console.error("Error parsing stored cart:", error);
      return null;
    }
  });
  const [serviceContext, setServiceContext] = useState(() => {
    try {
      // Retrieve the service data from storage or set it to null if not found
      const storedService = localStorage.getItem("serviceContext");
      return storedService ? JSON.parse(storedService) : null;
    } catch (error) {
      console.error("Error parsing stored service:", error);
      return null;
    }
  });
  const [productContext, setProductContext] = useState(() => {
    try {
      // Retrieve the product data from storage or set it to null if not found
      const storedProduct = localStorage.getItem("productContext");
      return storedProduct ? JSON.parse(storedProduct) : null;
    } catch (error) {
      console.error("Error parsing stored product:", error);
      return null;
    }
  });
  const [user, setUser] = useState(() => {
    try {
      // Retrieve the user data from storage or set it to null if not found
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  });

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <div className="app">
      <UserContext.Provider value={{ user, updateUser }}>
        <CartContext.Provider value={{ cartContext, setCartContext }}>
          <ServiceContext.Provider
            value={{ serviceContext, setServiceContext }}
          >
            <ProductContext.Provider
              value={{ productContext, setProductContext }}
            >
              <TotalContext.Provider value={{ totalContext, setTotalContext }}>
                <OrderContext.Provider
                  value={{ orderContext, setOrderContext }}
                >
                  <TrendingContext.Provider value={{ trending, setTrending }}>
                    <TotalOtherContext.Provider
                      value={{ TotalOther, setTotalOther }}
                    >
                      <MoneyUpdateContext.Provider
                        value={{ moneyUpdateContext, setMoneyUpdateContext }}
                      >
                        <CheckoutTypeContext.Provider
                          value={{
                            checkoutTypeContext,
                            setCheckoutTypeContext,
                          }}
                        >
                          <IdContext.Provider
                            value={{
                              idContext,
                              setIdContext,
                            }}
                          >
                            <BrowserRouter>
                              <Routes>
                                <Route
                                  path="/"
                                  element={user ? <Main /> : <LoginForm />}
                                />
                                <Route path="/login" element={<LoginForm />} />
                                <Route
                                  path="/signup"
                                  element={<SignupForm />}
                                />
                                <Route
                                  path="/businessmain"
                                  element={<BusinessHome />}
                                />
                                <Route path="/cart" element={<Cart />} />
                                <Route
                                  path="/order"
                                  element={<RecentOrders />}
                                />
                                <Route
                                  path="/checkoutcart"
                                  element={<CheckoutCart />}
                                />
                                <Route
                                  path="/checkoutservices"
                                  element={<CheckoutServices />}
                                />
                                <Route path="/buyPoints" element={<PayPal />} />
                                <Route path="/success" element={<Success />} />
                                <Route
                                  path="/topup"
                                  element={<PointsTopUp />}
                                />
                                <Route
                                  path="/businessForm"
                                  element={<BusinessForm />}
                                />
                                <Route
                                  path="/productForm"
                                  element={<ProductForm />}
                                />
                              </Routes>
                            </BrowserRouter>
                          </IdContext.Provider>
                        </CheckoutTypeContext.Provider>
                      </MoneyUpdateContext.Provider>
                    </TotalOtherContext.Provider>
                  </TrendingContext.Provider>
                </OrderContext.Provider>
              </TotalContext.Provider>
            </ProductContext.Provider>
          </ServiceContext.Provider>
        </CartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
