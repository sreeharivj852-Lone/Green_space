import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Suppliers.css";

function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {

    try {

      setLoading(true);

      const res = await api.get("suppliers/");
      setSuppliers(res.data);

      setError("");

    } catch (err) {

      console.log(err);
      setError("Failed to load suppliers");

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this supplier?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`suppliers/${id}/`);

      setSuppliers(
        suppliers.filter(
          (supplier) => supplier.id !== id
        )
      );

    } catch (err) {

      console.log(err);
      alert("Failed to delete supplier");

    }
  };

  if (loading) {

    return (
      <div className="suppliers-container">
        Loading...
      </div>
    );
  }

  return (

    <div className="suppliers-container">

      {/* HEADER */}
      <div className="suppliers-header">

        <h2>
          Suppliers
        </h2>

        <Link
          to="/add-supplier"
          className="add-supplier-btn"
        >
          + Add Supplier
        </Link>

      </div>

      {/* ERROR */}
      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      {/* GRID */}
      <div className="supplier-grid">

        {suppliers.map((supplier) => (

          <div
            className="supplier-card"
            key={supplier.id}
          >

            {/* TOP */}
            <div className="supplier-top">

              <h3>
                {supplier.name}
              </h3>

            </div>

            {/* DETAILS */}
            <div className="supplier-body">

              <p>
                <strong>Email:</strong>
                {" "}
                {supplier.email}
              </p>

              <p>
                <strong>Phone:</strong>
                {" "}
                {supplier.phone}
              </p>

              <p>
                <strong>Address:</strong>
                {" "}
                {supplier.address}
              </p>

            </div>

            {/* ACTIONS */}
            <div className="supplier-actions">

              <Link
                to={`/edit-supplier/${supplier.id}`}
                className="edit-btn"
              >
                Edit
              </Link>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(supplier.id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Suppliers;