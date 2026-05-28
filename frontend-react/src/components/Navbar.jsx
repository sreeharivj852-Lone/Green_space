import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileOpen && !e.target.closest(".sidebar") && !e.target.closest(".hamburger-btn")) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [mobileOpen]);

  return (
    <>
      <div className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-logo">
          <span className="logo-emoji">🌿</span>
          <span className="logo-text">GreenSpace</span>
        </div>

        <div className="sidebar-menu">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>

          <NavLink
            to="/plants"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="nav-icon">🌱</span>
            <span className="nav-text">Plants</span>
          </NavLink>

          <NavLink
            to="/add-plant"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="nav-icon">➕</span>
            <span className="nav-text">Add Plant</span>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-text">Orders</span>
          </NavLink>

          <NavLink
            to="/make-order"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-text">Make Order</span>
          </NavLink>

          <NavLink
            to="/care-schedules"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="nav-icon">📅</span>
            <span className="nav-text">Care Schedules</span>
          </NavLink>

          <NavLink
            to="/add-care-schedule"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="nav-icon">➕</span>
            <span className="nav-text">Add Schedule</span>
          </NavLink>

          <NavLink
            to="/suppliers"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="nav-icon">🏢</span>
            <span className="nav-text">Suppliers</span>
          </NavLink>

          <NavLink
            to="/add-supplier"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="nav-icon">➕</span>
            <span className="nav-text">Add Supplier</span>
          </NavLink>
        </div>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="hamburger-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)}></div>}
    </>
  );
}

export default Navbar;