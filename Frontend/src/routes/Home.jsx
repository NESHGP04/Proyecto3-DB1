// src/routes/Home.jsx
// Componente de Home que muestra el logo, título y botón para navegar al login.

import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import logo from "../assets/logo_med.png";
import "../styles/index.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="background">
      <div className="overlay-box">
        <DefaultLayout>
          <img src={logo} alt="EntrApp Logo" className="logo" />
          <h1>Clinik</h1>
          <p>Seguimiento de pacientes</p>
          <button onClick={() => navigate("/all-clinics")} className="button-home">Ingresar</button>
        </DefaultLayout>
      </div>
    </div>
  );
}
