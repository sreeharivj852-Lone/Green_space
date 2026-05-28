import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/addplant.css";

function EditPlant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    description: ""
  });

  // Fetch Existing Plant Data
  useEffect(() => {
    api.get(`plants/${id}/`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Update Plant
  const handleSubmit = (e) => {
    e.preventDefault();

    api.put(`plants/${id}/`, formData)
      .then(() => {
        alert("Plant Updated Successfully");
        navigate("/plants");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="edit-plant-container">
      {/* Header */}
      <div className="mb-4">
        <h1 className="page-title">Edit Plant</h1>
        <p className="page-subtitle">Update plant details in the nursery inventory</p>
      </div>

      {/* Form Card */}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Plant Name */}
            <div className="col-md-6 mb-4">
              <label className="form-label">Plant Name</label>
              <input
                type="text"
                name="name"
                className="form-control premium-input"
                placeholder="Enter plant name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div className="col-md-6 mb-4">
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-control premium-input"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Flower">Flower</option>
                <option value="Medicinal">Medicinal</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
            </div>

            {/* Quantity */}
            <div className="col-md-6 mb-4">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control premium-input"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div className="col-md-6 mb-4">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                className="form-control premium-input"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="col-12 mb-4">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control premium-input"
                rows="5"
                placeholder="Enter plant description"
                value={formData.description || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Update Plant
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPlant;