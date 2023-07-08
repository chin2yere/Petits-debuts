import "./Main.css"
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext.js";
import { Link } from "react-router-dom";

function Main() {
    const { user, updateUser } = useContext(UserContext);
    const [business, setBusiness] = useState([]);
    const [form, setForm] = useState({
      title: '',
      content: '',
      credentials: 'include'
    });
  
    useEffect(() => {
      const fetchBusiness = async () => {
        const response = await fetch('http://localhost:3000/business');
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
      const response = await fetch('http://localhost:3001/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include'
      });
      const newBusiness = await response.json();
      setBusiness([newBusiness, ...business]);
    };

    const handleLogout = () => {
      // Perform logout logic here
      // Example: Clear user data from localStorage, reset user state, etc.
      updateUser(null);
    };
  
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
        <form className="new-post-form" onSubmit={handleSubmit}>
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
        </form>
        <div className="posts-container">
          {business.map((business) => (
          <div className="post" key={business.id}>
              <h2>{business.location}</h2>
              <h4>By {business.user.name} at {new Date(business.createdAt).toLocaleString()}</h4>
              <p>{business.rating}</p>
          </div>
          ))}
        </div>
      </div>
    )
}

export default Main;