import React from "react";
import "../../styles/clientDetail.css";
import { useNavigate } from "react-router-dom";

const Izquierda = () => {
  const navigate = useNavigate();

    // Cambiar con datos reales
  const employeeData = {
    name: "Angel Mendoza",
    nit: "3460854-7",
    birthDate: "11/11/1978",
    position: "Gerente de ventas",
    dpi: "3008366610101",
    salary: "Q 8,000.00",
    igssAffiliation: "56789",
    baseHours: "9 horas",
    photo: null
  };

  return (
    <div className="employee-sidebar">
        <div className="employee-photo-container">
        {employeeData.photo ? (
          <img
            src={employeeData.photo}
            alt={employeeData.name}
            className="employee-photo"
          />
        ) : (
          <div className="employee-photo-placeholder"></div>
        )}
      </div>
      <div className="button-container">
            <button
            className="modify-button"
            onClick={() => navigate("/add-citas")}
            >
              Agregar Cita
            </button>

            <button className="modify-button">
              Reporte Paciente
            </button>
      </div>
    </div>
  );
    
};

export default Izquierda;