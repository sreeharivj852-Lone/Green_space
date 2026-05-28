import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/addschedule.css";

function AddCareSchedule() {

  const navigate = useNavigate();

  const [plants, setPlants] = useState([]);

  const [plant, setPlant] = useState("");
  const [wateringDate, setWateringDate] = useState("");
  const [fertilizerDate, setFertilizerDate] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {

    try {

      const res = await api.get("plants/");
      setPlants(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("care-schedules/", {

        plant: Number(plant),
        watering_date: wateringDate,
        fertilizer_date: fertilizerDate,
        notes: notes

      });

      setMessage("Schedule added successfully!");
      setError("");

      setTimeout(() => {
        navigate("/care-schedules");
      }, 1000);

    } catch (err) {

      console.log(err.response.data);

      setError("Failed to add schedule");
      setMessage("");

    }
  };

  return (

    <div className="addschedule-container">

      <div className="addschedule-card">

        <h2>Add Care Schedule</h2>

        <form onSubmit={handleSubmit}>

          {/* PLANT */}
          <label>Plant</label>

          <select
            value={plant}
            onChange={(e) => setPlant(e.target.value)}
            required
          >

            <option value="">
              Select Plant
            </option>

            {plants.map((plantItem) => (

              <option
                key={plantItem.id}
                value={plantItem.id}
              >
                {plantItem.name}
              </option>

            ))}

          </select>

          {/* WATERING DATE */}
          <label>Watering Date</label>

          <input
            type="date"
            value={wateringDate}
            onChange={(e) =>
              setWateringDate(e.target.value)
            }
            required
          />

          {/* FERTILIZER DATE */}
          <label>Fertilizer Date</label>

          <input
            type="date"
            value={fertilizerDate}
            onChange={(e) =>
              setFertilizerDate(e.target.value)
            }
            required
          />

          {/* NOTES */}
          <label>Notes</label>

          <textarea id="tarea"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            rows="4"
            placeholder="Enter care notes..."
          />

          {/* BUTTON */}
          <button type="submit">
            Add Schedule
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

export default AddCareSchedule;