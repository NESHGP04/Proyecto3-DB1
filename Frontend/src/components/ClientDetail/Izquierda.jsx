//Botones Detalle Paciente
import React from "react";
import "../../styles/clientDetail.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";


const Izquierda = ({idPaciente}) => {
  const navigate = useNavigate();
  const URL = `http://localhost:3001/pacientes/${idPaciente}`;

  const generarReportePaciente = async () => {
    try {
        const response = await fetch(URL);
        const pacientes = await response.json();

        if (!pacientes || pacientes.length === 0) {
            alert("No hay paciente para exportar.");
            return;
        }

        // Crear CSV
        const encabezado = ["ID Paciente", "Nombre","Fecha de Nacimiento", "Dirección", "Teléfono", "Clínica", "Doctor", "Cita", "Tratamiento"]; //Doctor y tratamiento no encontrados
        const filas = pacientes.map(p => [p.id_paciente, p.nombre, p.fecha_nacimiento, p.direccion, p.telefono, p.id_clinica, p.citas]);

        const csvContent = [encabezado, ...filas]
            .map(row => row.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        // Crear enlace de descarga
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "reporte_paciente.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error al generar reporte:", error);
        alert("Error al generar el reporte.");
    }
  };

  const employeeData = {
    photo: null
  };

  return (
    <div className="employee-sidebar">
        <div className="employee-photo-container">
        {employeeData.photo ? (
          <img
            src={employeeData.photo}
            alt="container"
            className="employee-photo"
          />
        ) : (
          <div className="employee-photo-placeholder"></div>
        )}
      </div>
      <div className="button-container">
            <button
              className="modify-button"
              onClick={() => navigate(`/client-detail/${idPaciente}/add-cita`)}
            >
              Agregar Cita
            </button>

            <button className="modify-button" onClick={generarReportePaciente}>
              Reporte Paciente
            </button>

            <button className="modify-button">
              Facturación
            </button>
      </div>
    </div>
  );
    
};

export default Izquierda;