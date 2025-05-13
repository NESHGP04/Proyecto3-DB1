
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import logo from "../../assets/logo_med.png"

const Navbar = () => {
  const navigate = useNavigate();
  const idClinica = localStorage.getItem("idClinica");

  return (
    <header className="main-header">
      <nav className="main-nav">
        <div className="nav-item" onClick={() => navigate("/all-clinics")}>Listado Clinicas</div>
        <div className="nav-item" onClick={() => navigate("/all-clients")}>
          Listado Pacientes
        </div>
        <div className="nav-item" onClick={() => navigate("/reports")}>Reportes</div>
        <div className="logo-container">
          <img src={logo} alt="Coremsa Logo" className="company-logo" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;