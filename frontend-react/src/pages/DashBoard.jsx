import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {

  // DASHBOARD STATS
  const [totalPlants, setTotalPlants] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [lowStockPlants, setLowStockPlants] = useState(0);

  // RECENT ACTIVITY
  const [recentActivities, setRecentActivities] = useState([]);

  // LOW STOCK LIST
  const [lowStockList, setLowStockList] = useState([]);

  // UI STATES
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // FORMAT DATE
  const formatActivityDate = (dateStr) => {

    if (!dateStr) return "";

    try {

      const d = new Date(dateStr);

      return d.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });

    } catch (e) {

      return "";

    }
  };

  // FETCH DASHBOARD DATA
  const fetchDashboardData = async () => {

    try {

      setLoading(true);

      const [plantsRes, ordersRes, suppliersRes, careSchedulesRes] =
        await Promise.all([
          api.get("plants/"),
          api.get("orders/"),
          api.get("suppliers/"),
          api.get("care-schedules/")
        ]);

      const plants = plantsRes.data;
      const orders = ordersRes.data;
      const suppliers = suppliersRes.data;
      const careSchedules = careSchedulesRes.data;

      // TOTAL COUNTS
      setTotalPlants(plants.length);
      setTotalOrders(orders.length);
      setTotalSuppliers(suppliers.length);

      // LOW STOCK
      const lowStockData = plants.filter(
        (plant) => Number(plant.quantity) < 10
      );

      setLowStockPlants(lowStockData.length);
      setLowStockList(lowStockData);

      // PLANT ACTIVITIES
      const plantActivities = plants.map((plant) => ({
        id: `plant-${plant.id}`,
        title: plant.name,
        detail: "Added to inventory",
        icon: "🪴",
        time: plant.created_at
          ? new Date(plant.created_at).getTime()
          : 0,
        dateStr: plant.created_at,
      }));

      // ORDER ACTIVITIES
      const orderActivities = orders.map((order) => ({
        id: `order-${order.id}`,
        title: order.customer_name,
        detail: `Ordered ${order.quantity} × ${order.plant_name}`,
        icon: "📦",
        time: order.order_date
          ? new Date(order.order_date).getTime()
          : 0,
        dateStr: order.order_date,
      }));

      // CARE SCHEDULE ACTIVITIES
      const scheduleActivities = careSchedules.map((schedule) => ({
        id: `schedule-${schedule.id}`,
        title: schedule.plant_name || `Plant #${schedule.plant}`,
        detail: `Care scheduled (Watering: ${schedule.watering_date}, Fertilizer: ${schedule.fertilizer_date})`,
        icon: "📅",
        time: schedule.created_at
          ? new Date(schedule.created_at).getTime()
          : 0,
        dateStr: schedule.created_at,
      }));

      // COMBINE ACTIVITIES
      const combinedActivities = [
        ...plantActivities,
        ...orderActivities,
        ...scheduleActivities,
      ]
        .sort((a, b) => b.time - a.time)
        .slice(0, 10);

      setRecentActivities(combinedActivities);

      setError(null);

    } catch (err) {

      console.error("Dashboard Error:", err);

      setError("Failed to load dashboard");

    } finally {

      setLoading(false);

    }
  };

  // LOADING
  if (loading) {

    return (
      <div className="dashboard-container">
        Loading...
      </div>
    );
  }

  return (

    <div className="dashboard-container">

      {/* TITLE */}
      <h2 className="dashboard-title">
        Dashboard
      </h2>

      {/* ERROR */}
      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* DASHBOARD CARDS */}
      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Total Plants</h3>
          <p>{totalPlants}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="dashboard-card">
          <h3>Suppliers</h3>
          <p>{totalSuppliers}</p>
        </div>

        <div className="dashboard-card">
          <h3>Low Stock</h3>
          <p>{lowStockPlants}</p>
        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="recent-section">

        <h2>Recent Activity</h2>

        <div className="recent-list">

          {recentActivities.map((activity) => (

            <div
              className="recent-item"
              key={activity.id}
            >

              {/* ICON */}
              <div className="recent-icon">
                {activity.icon}
              </div>

              {/* CONTENT */}
              <div className="recent-content">

                <div className="recent-top">

                  <strong className="recent-title">
                    {activity.title}
                  </strong>

                  {activity.dateStr && (
                    <span className="recent-item-time">
                      {formatActivityDate(activity.dateStr)}
                    </span>
                  )}

                </div>

                <p className="recent-detail">
                  {activity.detail}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* LOW STOCK ALERTS */}
      <div className="lowstock-section">

        <h2>Low Stock Alerts</h2>

        {lowStockList.length === 0 ? (

          <p className="nostock-warning">
            All plants are sufficiently stocked 🌱
          </p>

        ) : (

          lowStockList.map((plant) => (

            <div
              className="lowstock-item"
              key={plant.id}
            >

              <div>

                <strong>
                  {plant.name}
                </strong>

                <p>
                  Only {plant.quantity} left
                </p>

              </div>

              <span>⚠</span>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Dashboard;