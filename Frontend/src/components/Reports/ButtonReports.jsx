import React from "react";
import "../../styles/reports.css";
import { useParams } from "react-router-dom";

const Derecha = () => {
  const { id } = useParams(); // capturamos el id de la clínica
    
  const URL_MEDICOS = `http://localhost:3001/medicos`;
  const URL_CITAS = `http://localhost:3001/citas`;
  const URL_CONSULTAS = `http://localhost:3001/consultas`;

  const generarReporteMedicos = async () => {
    try {
      const response = await fetch(URL_MEDICOS);
      const medicos = await response.json();

      if (!medicos || medicos.length === 0) {
        alert("No hay médicos para exportar.");
        return;
      }

      // Armar encabezado dinámicamente
      const encabezado = ["Nombre", "Especialidad", "Teléfono", "ID Clínica"];
      const filas = medicos.map(m => [
        m.nombre || "",
        m.especialidad || "",
        m.telefono || "",
        m.id_clinica || ""
      ]);

      const csvContent = [encabezado, ...filas]
      .map(row => row.map(item => `"${item}"`).join(","))
      .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "reporte_medicos.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al generar reporte de médicos:", error);
      alert("Error al generar el reporte de médicos.");
    }
  };

  const generarReporteCitas = async () => {
    try {
      const response = await fetch(URL_CITAS);
      const citas = await response.json();

      if (!citas || citas.length === 0) {
        alert("No hay citas para exportar.");
        return;
      }

      // Armar encabezado dinámicamente
      const encabezado = ["Paciente", "Médico", "ID Clínica", "Fecha", "Estado"];
      const filas = medicos.map(m => [
        m.id_paciente || "",
        m.id_medico || "",
        m.id_clinica || "",
        m.fecha || "",
        m.estado || ""
      ]);

      const csvContent = [encabezado, ...filas]
      .map(row => row.map(item => `"${item}"`).join(","))
      .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "reporte_citas.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al generar reporte de citas:", error);
      alert("Error al generar el reporte de citas.");
    }
  };

  const generarReporteConsultas = async () => {
    try {
      const response = await fetch(URL_CONSULTAS);
      const medicos = await response.json();

      if (!medicos || medicos.length === 0) {
        alert("No hay consultas para exportar.");
        return;
      }

      const encabezado = ["ID Consulta","ID Cita", "Diagnóstico"];
      const filas = medicos.map(m => [
        m.id_consulta || "",
        m.id_cita || "",
        m.diagnostico || ""
      ]);

      const csvContent = [encabezado, ...filas]
      .map(row => row.map(item => `"${item}"`).join(","))
      .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "reporte_consultas.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al generar reporte de consultas:", error);
      alert("Error al generar el reporte de consultas.");
    }
  };

  return (
    <div className="employee-info-container">
          <div className="info-row">
            <div className="info-field">
              <button className="report-btn" onClick={generarReporteMedicos}>Médicos</button>
            </div>
            
            <div className="info-field">
                <button className="report-btn" onClick={generarReporteCitas}>Citas</button>
            </div>

            <div className="info-field">
                <button className="report-btn" onClick={generarReporteConsultas}>Consultas</button>
            </div>
          </div>
    </div>
  );
};

export default Derecha;