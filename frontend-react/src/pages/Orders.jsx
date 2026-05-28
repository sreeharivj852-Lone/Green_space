import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/orders.css";
import { Link } from "react-router-dom";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await api.get("orders/");
      setOrders(res.data);

      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "";
    return status.toLowerCase();
  };

  if (loading) {
    return <div className="orders-container">Loading...</div>;
  }

  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>

            {/* HEADER */}
            <div className="order-header">
              <h3>Order #{order.id}</h3>

              <span className={`status ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </div>

            {/* BODY */}
            <div className="order-body">

              <p>
                <strong>Customer:</strong> {order.customer_name}
                <br />

              </p>

              <p>
                <strong>Plant:</strong> {order.plant_name}
                <br />

              </p>

              <p>
                <strong>Quantity:</strong> {order.quantity}
                <br />

              </p>

              <p>
                <strong>Total Price:</strong> ₹{order.total_price}
                <br />

              </p>
              <div className="order-actions">

                <button className="edit-btn">
                  <Link to={`/edit-order/${order.id}`}>
                    Edit
                  </Link>
                </button>
                  &nbsp;
                <button className="delete-btn">
                  <Link to={`/orders/${order.id}/delete`}>
                    Delete
                  </Link>
                </button>

              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;