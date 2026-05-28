import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/careschedule.css";

function CareSchedule() {

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {

    try {

      setLoading(true);

      const res = await api.get("care-schedules/");
      setSchedules(res.data);

      setError("");

    } catch (err) {

      console.log(err);
      setError("Failed to load schedules");

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this schedule?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`care-schedules/${id}/`);

      setSchedules(
        schedules.filter(
          (schedule) => schedule.id !== id
        )
      );

    } catch (err) {

      console.log(err);
      alert("Failed to delete schedule");

    }
  };

  if (loading) {
    return (
      <div className="careschedule-container">
        Loading...
      </div>
    );
  }

  return (

    <div className="careschedule-container">

      {/* HEADER */}
      <div className="careschedule-header">

        <h2>
          Care Schedules
        </h2>

        <Link
          to="/add-care-schedule"
          className="add-schedule-btn"
        >
          + Add Schedule
        </Link>

      </div>

      {/* ERROR */}
      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      {/* SCHEDULE GRID */}
      <div className="schedule-grid">

        {schedules.map((schedule) => (

          <div
            className="schedule-card"
            key={schedule.id}
          >

            {/* TOP */}
            <div className="schedule-top">

              <h3>
                {schedule.plant_name || `Plant #${schedule.plant}`}
              </h3>

            </div>

            {/* DETAILS */}
            <div className="schedule-body">

              <p>
                <strong>Watering:</strong> {schedule.watering_date}
              </p>

              <p>
                <strong>Fertilizer:</strong> {schedule.fertilizer_date}
              </p>

              {schedule.notes && (
                <p>
                  <strong>Notes:</strong> {schedule.notes}
                </p>
              )}

            </div>

            {/* ACTIONS */}
            <div className="schedule-actions">

              <Link
                to={`/edit-care-schedule/${schedule.id}`}
                className="edit-btn"
              >
                Edit
              </Link>

              <button
                className="delete-btn"
                onClick={() => handleDelete(schedule.id)}
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

export default CareSchedule;