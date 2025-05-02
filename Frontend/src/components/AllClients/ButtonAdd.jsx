import React from "react";
import "../../styles/allClients.css";
import { useNavigate } from "react-router-dom";

const ButtonAdd = () => {
    const navigate = useNavigate();
    return(
        <div className="button-agregar">
            <button onClick={() => navigate("/add-clients")}>Agregar Paciente</button>
        </div>

    );
}

export default ButtonAdd;