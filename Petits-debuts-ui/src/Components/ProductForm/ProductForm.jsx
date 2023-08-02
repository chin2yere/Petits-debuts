import * as React from "react";
import "./ProductForm.css";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, IdContext } from "../../UserContext";
//this page basically collects information that is needed to make a network call to create a new business product
export default function ProductForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [service, setService] = useState(false);
  const [availability, setAvailability] = useState("");

  const { user } = useContext(UserContext);
  const { idContext } = useContext(IdContext);
  const navigate = useNavigate();

  //this useeffect saved the id context to memory
  useEffect(() => {
    function saveIdData(data) {
      localStorage.setItem("idContext", JSON.stringify(data));
    }
    saveIdData(idContext);
  }, []);
  //this function sets the service to true or false on select
  function serviceSetter(value) {
    if (value === "true") {
      setService(true);
    } else {
      setService(false);
    }
  }
  //this function set's the user's availability on select
  function availabilitySetter(value) {
    if (value === "package 1") {
      const tempAvailability = [
        1, 3, 5, 7, 9, 11, 13, 15, 16, 17, 19, 21, 23, 25, 27, 29,
      ];
      setAvailability(tempAvailability);
    } else {
      const tempAvailability = [
        2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30,
      ];
      setAvailability(tempAvailability);
    }
  }
  //this function creates the new product
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      // Make the create product API request

      const response = await fetch(`http://localhost:3000/product/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          description,
          price,
          quantity,
          service,
          availability,
          idContext,
        }),
        credentials: "include",
      });

      if (response.ok) {
        // Navigate to the business page after successful login
        navigate("/businessmain");
      } else {
        // Handle the create failure case
        alert("creation failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
    }
  };

  return (
    <section className="productForm">
      <form onSubmit={handleCreate}>
        <h2>Create a new product for your business </h2>
        <div className="group-productForm">
          <label className="label-productForm" htmlFor="username">
            <strong>Name:</strong>
          </label>
          <input
            className="inputs-productForm"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="group-productForm">
          <label className="label-productForm" htmlFor="description">
            <strong>Description:</strong>
          </label>
          <textarea
            className="description"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="group-productForm">
          <label className="label-productForm" htmlFor="price">
            <strong>Price:</strong>
          </label>
          <input
            className="inputs-productForm"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="group-productForm">
          <label className="label-productForm" htmlFor="quantity">
            <strong>Total Quantity Available :</strong>
          </label>
          <input
            className="inputs-productForm"
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="group-productForm">
          <label className="label-productForm" htmlFor="dropdownCategory">
            <strong>Category:</strong>
          </label>
          <select
            className="inputs-productForm"
            id="dropdownCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Select a category --</option>
            <option value="Custom Products">Custom Products</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Hair & nails">Hair & nails</option>
            <option value="Clothes & shoes">Clothes & shoes</option>
            <option value="Food">Food</option>
            <option value="Photography">Photography</option>
          </select>
        </div>
        <div className="group-productForm">
          <label className="label-productForm" htmlFor="dropdownService">
            <strong>Will this be a service?:</strong>
          </label>
          <select
            className="inputs-productForm"
            id="dropdownService"
            value={service}
            onChange={(e) => serviceSetter(e.target.value)}
          >
            <option value="">-- Select a true or false --</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div>
          <p>
            For services, we offer two types of availability packages.<br></br>
            Package 1 sets your availability to every other odd day of the
            month. i.e 13,15...<br></br>Package 2 sets your availability to
            every other even day of the month. i.e 14,16...
          </p>
        </div>
        <div className="group-productForm">
          <label className="label-productForm" htmlFor="dropdownAvailability">
            <strong>Which package will you prefer?:</strong>
          </label>
          <select
            className="inputs-productForm"
            id="dropdownAvailability"
            value={availability}
            onChange={(e) => {
              availabilitySetter(e.target.value);
            }}
          >
            <option value="">-- Select a Package --</option>
            <option value="package 1">Package 1</option>
            <option value="package 2">Package 2</option>
          </select>
        </div>

        <button className="button-productForm" type="submit">
          Create Product
        </button>
      </form>
    </section>
  );
}
