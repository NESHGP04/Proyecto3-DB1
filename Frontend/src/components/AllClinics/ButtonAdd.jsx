import React from "react";
import "../../styles/allClients.css";
import { useNavigate } from "react-router-dom";


const ButtonAdd = () => {
    const navigate = useNavigate();

    const generarReporteClinicas = async () => {
        try {
            const response = await fetch('http://localhost:3001/clinicas');
            const clinicas = await response.json();

            if (!clinicas || clinicas.length === 0) {
                alert("No hay clínicas para exportar.");
                return;
            }

            // Crear CSV
            const encabezado = ["ID Clínica", "Nombre", "Dirección"];
            const filas = clinicas.map(c => [c.id_clinica, c.nombre, c.direccion]);

            const csvContent = [encabezado, ...filas]
                .map(row => row.join(","))
                .join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);

            // Crear enlace de descarga
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "reporte_clinicas.csv");
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error al generar reporte:", error);
            alert("Error al generar el reporte.");
        }
    };

    return(
        <div className="button-container">
            <div className="button-agregar">
                <button onClick={() => navigate("/add-clinic")}>Agregar Clínica</button>
            </div>

            <div className="button-report">
                <button onClick={generarReporteClinicas}>Reporte Clinicas</button>
            </div>
        </div>
    );
}

export default ButtonAdd;