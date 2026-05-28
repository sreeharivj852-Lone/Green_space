import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/AddSuppliers.css";

function AddSupplier() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("suppliers/", {

        name,
        email,
        phone,
        address

      });

      setMessage("Supplier added successfully!");
      setError("");

      setTimeout(() => {
        navigate("/suppliers");
      }, 1000);

    } catch (err) {

      console.log(err.response?.data || err);

      setError("Failed to add supplier");
      setMessage("");

    }
  };

  return (

    <div className="addsupplier-container">

      <div className="addsupplier-card">

        <h2>
          Add Supplier
        </h2>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <label>Supplier Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter supplier name"
            required
          />

          {/* EMAIL */}
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter email"
            required
          />

          {/* PHONE */}
          <label>Phone</label>

          <input
            type="text"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="Enter phone number"
            required
          />

          {/* ADDRESS */}
          <label>Address</label>

          <textarea
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            rows="4"
            placeholder="Enter supplier address"
            required
          />

          {/* BUTTON */}
          <button type="submit">
            Add Supplier
          </button>

          {/* SUCCESS */}
          {message && (
            <p className="success-text">
              {message}
            </p>
          )}

          {/* ERROR */}
          {error && (
            <p className="error-text">
              {error}
            </p>
          )}

        </form>

      </div>

    </div>
  );
}

export default AddSupplier;