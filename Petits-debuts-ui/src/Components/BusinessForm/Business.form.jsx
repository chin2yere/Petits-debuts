import * as React from "react";
import "./BusinessForm.css";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, IdContext } from "../../UserContext";
//this page basically collects information that is needed to make a network call to create a new business
export default function ProductForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const [service, setService] = useState(false);

  const { user } = useContext(UserContext);
  const { idContext } = useContext(IdContext);
  const navigate = useNavigate();

  useEffect(() => {
    function saveIdData(data) {
      localStorage.setItem("idContext", JSON.stringify(data));
    }
    saveIdData(idContext);
  }, []);
  function serviceSetter(value) {
    if (value === "true") {
      setService(true);
    } else {
      setService(false);
    }
  }

  const handleCreateBusiness = async (e) => {
    e.preventDefault();

    try {
      // Make the create business API request

      const response = await fetch(`http://localhost:3000/business/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          location,
          service,
          idContext,
        }),
        credentials: "include",
      });

      if (response.ok) {
        // Navigate to the business page after successful login
        navigate("/businessmain");
      } else {
        // Handle the creation failure case
        alert("creation failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
    }
  };

  return (
    <section className="businessForm">
      <form onSubmit={handleCreateBusiness}>
        <h2>Create a new Business</h2>
        <div className="group-businessForm">
          <label className="label-businessForm" htmlFor="name">
            <strong>Business Name:</strong>
          </label>
          <input
            className="inputs-businessForm"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="group-businessForm">
          <label className="label-businessForm" htmlFor="dropdownLocation">
            <strong>Location:</strong>
          </label>
          <select
            className="inputs-businessForm"
            id="dropdownLocation"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">-- Select a Location --</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="New York">New York</option>
            <option value="Delaware">Delaware</option>
            <option value="Baltimore">Baltimore</option>
            <option value="Maryland">Maryland</option>
            <option value="New Jersey">New Jersey</option>
          </select>
        </div>
        <div className="group-businessForm">
          <label className="label-businessForm" htmlFor="dropdownService">
            <strong>Will this business offer at least one service?:</strong>
          </label>
          <select
            className="inputs-businessForm"
            id="dropdownService"
            value={service}
            onChange={(e) => serviceSetter(e.target.value)}
          >
            <option value="">-- Select a true or false --</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <button className="button-businessForm" type="submit">
          Create Business
        </button>
      </form>
    </section>
  );
}
