import React from "react";
import "../../styles/allClients.css";
import { useNavigate, useParams } from "react-router-dom";

const ButtonAdd = () => {
    const navigate = useNavigate();
    const { id} = useParams(); // Asegúrate que en la ruta esté definido como `:id_clinica`

    const URL = `http://localhost:3001/clinicas/${id}/pacientes`;

    const generarReportePacientes = async () => {
        try {
            const response = await fetch(URL);
            const pacientes = await response.json();

            if (!pacientes || pacientes.length === 0) {
                alert("No hay pacientes para exportar.");
                return;
            }

            const encabezado = ["ID Paciente", "Nombre", "Cita"];
            const filas = pacientes.map(p => [p.id_paciente, p.nombre, p.citas]);

            const csvContent = [encabezado, ...filas]
                .map(row => row.join(","))
                .join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "reporte_pacientes.csv");
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error al generar reporte:", error);
            alert("Error al generar el reporte.");
        }
    };

    return (
        <div className="button-container">
            <div className="button-agregar">
            <button onClick={() => navigate(`/all-clinics/${id}/all-clients/add-client`)}>
            Agregar Paciente
            </button>
            </div>

            {/* <div className="button-report">
                <button onClick={generarReportePacientes}>Reporte Pacientes</button>
            </div> */}
        </div>
    );
};

export default ButtonAdd;
