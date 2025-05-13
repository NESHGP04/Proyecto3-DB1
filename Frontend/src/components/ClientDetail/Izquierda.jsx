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
      const paciente = await response.json();
  
      if (!paciente || Object.keys(paciente).length === 0) {
        alert("No hay paciente para exportar.");
        return;
      }
  
      // Encabezados del CSV
      const encabezado = [
        "ID Paciente",
        "Nombre",
        "Fecha de Nacimiento",
        "Dirección",
        "Teléfono",
        "Clínica"
        // Puedes añadir más campos aquí si tienes doctor, citas, tratamiento, etc.
      ];
  
      // Crear fila con los datos del paciente
      const fila = [
        paciente.id_paciente,
        paciente.nombre,
        paciente.fecha_nacimiento,
        paciente.direccion,
        paciente.telefono,
        paciente.id_clinica
        // Aquí también podrías incluir info como paciente.doctor.nombre, etc. si tu endpoint lo devuelve.
      ];
  
      const csvContent = [encabezado, fila]
        .map(row => row.join(","))
        .join("\n");
  
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
  
      // Crear enlace de descarga
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `reporte_paciente_${paciente.id_paciente}.csv`);
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
      </div>
    </div>
  );
    
};

export default Izquierda;