import "./Main.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext.js";
import { Link } from "react-router-dom";
import Trending from "../Trending/Trending";
import Search from "../Search/Search";
import ProductGrid from "../ProductGrid/ProductGrid";

function Main() {
  const { user, updateUser } = useContext(UserContext);
  const [business, setBusiness] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedLocation, setSelectedLocation] = useState("All locations");

  const [form, setForm] = useState({
    title: "",
    content: "",
    credentials: "include",
  });

  useEffect(() => {
    const fetchBusiness = async () => {
      const response = await fetch("http://localhost:3000/business");
      const data = await response.json();
      setBusiness(data);
    };
    fetchBusiness();
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
      {/* <form className="new-post-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
            />
            <textarea
                name="content"
                placeholder="Content"
                value={form.content}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form> */}
      <div className="row-trending-main">
        <Trending />
      </div>
      <div className="row-search-main">
        <Search
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div>
        <ProductGrid
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          filterProductsByCategory={filterProductsByCategory}
          filterProductsByLocation={filterProductsByLocation}
        />
      </div>

      <div className="posts-container">
        {business.map((business) => (
          <div className="post" key={business.id}>
            <h2>{business.location}</h2>
            <h4>
              By {business.user.name} at{" "}
              {new Date(business.createdAt).toLocaleString()}
            </h4>
            <p>{business.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
