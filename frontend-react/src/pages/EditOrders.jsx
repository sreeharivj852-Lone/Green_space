import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/editorders.css";

function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`orders/${id}/`);
      setOrder(res.data);
      setStatus(res.data.status);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to load order");
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.put(`orders/${id}/`, {
        ...order,
        status: status
      });

      setMessage("Order updated successfully!");
      setError("");

      setTimeout(() => {
        navigate("/orders");
      }, 1000);

    } catch (err) {
      console.log(err);
      setError("Failed to update order");
      setMessage("");
    }
  };

  if (loading) {
    return <div className="editorder-container">Loading...</div>;
  }

  return (
    <div className="editorder-container">

      <h2 className="editorder-title">Edit Order</h2>

      <div className="editorder-card">

        <p><strong>Customer:</strong> {order.customer_name}</p>
        <p><strong>Plant:</strong> {order.plant_name}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Total:</strong> ₹{order.total_price}</p>

        <form onSubmit={handleUpdate}>

          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button type="submit">Update Order</button>

        </form>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

      </div>
    </div>
  );
}

export default EditOrder;