import * as React from "react";
import { useNavigate } from "react-router-dom";
//this is the successful transaction page
export default function Success() {
  const navigate = useNavigate();
  return (
    <section className="sidebar">
      <h1>Transaction successful</h1>
      <button onClick={() => navigate("/")}>Go back to home page</button>
    </section>
  );
}
