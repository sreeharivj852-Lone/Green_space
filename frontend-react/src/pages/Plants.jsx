import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/plant.css";

function Plants() {

    const [plants, setPlants] = useState([]);

    // Fetch Plants
    const fetchPlants = () => {

        api.get("plants/")
            .then((response) => {
                setPlants(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    useEffect(() => {
        fetchPlants();
    }, []);

    // Delete Plant
    const deletePlant = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this plant?"
        );

        if (confirmDelete) {

            api.delete(`plants/${id}/`)
                .then(() => {

                    alert("Plant Deleted Successfully");

                    fetchPlants();

                })
                .catch((error) => {
                    console.log(error);
                });

        }
    };

    return (

        <div className="plants-page">

            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h1 className="page-title">
                        Plants Dashboard
                    </h1>

                    <p className="page-subtitle">
                        Manage your nursery inventory easily
                    </p>
                </div>

                <Link
                    to="/add-plant"
                    className="add-plant-btn"
                >
                    + Add Plant
                </Link>

            </div>

            {/* Table Card */}
            <div className="table-card">

                <table className="table custom-table align-middle">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {plants.map((plant) => (

                            <tr key={plant.id}>

                                <td>
                                    <strong>{plant.name}</strong>
                                </td>

                                <td>
                                    <span className="category-badge">
                                        {plant.category}
                                    </span>
                                </td>

                                <td>{plant.quantity}</td>

                                <td>
                                    ₹{plant.price}
                                </td>

                                <td>

                                    <div className="d-flex gap-2">

                                        <Link
                                            to={`/edit-plant/${plant.id}`}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            className="delete-btn"
                                            onClick={() => deletePlant(plant.id)}
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default Plants;