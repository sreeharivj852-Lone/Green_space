import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/MakeOrders.css";

function MakeOrder() {
  const [plants, setPlants] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [plantId, setPlantId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("Pending");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const res = await api.get("plants/");
      setPlants(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load plants");
    }
  };

  // get selected plant object
  const selectedPlant = plants.find(
    (p) => p.id === parseInt(plantId)
  );

  // calculate total price dynamically
  const totalPrice = selectedPlant
    ? selectedPlant.price * quantity
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("orders/", {
        customer_name: customerName,
        plant: parseInt(plantId, 10),
        quantity: Number(quantity),
        total_price: totalPrice,
        status: status
      });

      setMessage("Order created successfully!");
      setError("");

      // reset form
      setCustomerName("");
      setPlantId("");
      setQuantity(1);
      setStatus("Pending");

    } catch (err) {
      console.log(err);
      setError("Failed to create order");
      setMessage("");
    }
  };

  return (
    <div className="makeorder-container">

      <h2 className="makeorder-title">Create Order</h2>

      <form className="makeorder-form" onSubmit={handleSubmit}>

        {/* CUSTOMER */}
        <label>Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        {/* PLANT */}
        <label>Plant</label>
        <select
          value={plantId}
          onChange={(e) => setPlantId(e.target.value)}
          required
        >
          <option value="">Select Plant</option>
          {plants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.name}
            </option>
          ))}
        </select>

        {/* QUANTITY */}
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />

        {/* TOTAL PRICE (READ ONLY) */}
        <label>Total Price</label>
        <input
          type="text"
          value={`₹ ${totalPrice}`}
          disabled
        />

        {/* STATUS */}
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button type="submit">Create Order</button>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

      </form>
    </div>
  );
}

export default MakeOrder;