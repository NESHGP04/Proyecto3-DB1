import React from "react";
import "../../styles/allClients.css";
import { useNavigate } from "react-router-dom";

const ButtonAdd = () => {
    const navigate = useNavigate();
    return(
        <div className="button-container">
            <div className="button-agregar">
                <button onClick={() => navigate("/add-clinic")}>Agregar Clínica</button>
            </div>

            <div className="button-report">
                <button>Reporte Clinicas</button>
            </div>
        </div>
    );
}

export default ButtonAdd;