import "./App.css";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Components/Main/Main";
import LoginForm from "./Components/LoginForm/LoginForm";
import SignupForm from "./Components/SignupForm/SignupForm";

function App() {
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
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={ <Main /> } /> */}
            <Route path="/" element={user ? <Main /> : <LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
