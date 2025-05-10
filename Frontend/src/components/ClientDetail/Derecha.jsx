import React from "react";
import "../../styles/clientDetail.css";
import { FaEdit } from 'react-icons/fa';

const Derecha = () => {

    const employeeData = {
        name: "Angel Mendoza",
        birthDate: "11/11/1978",
        num: "01",
        direccion: "zona 10",
        telefono: "56183765",
        photo: null,
        fecha: "07/05/25",
        tratamiento: "Chqueo general",
        doctor: "Dr. Alejandro Pérez"
      };
    
    
  return (
    <div className="employee-info-container">

          <div className="info-row">
            <div className="info-field">
              <div className="field-label">Nombre</div>
              <div className="field-value golden-text">{employeeData.name}</div>
            </div>
            
            <div className="info-field">
              <div className="field-label">Fecha de Nacimiento</div>
              <div className="field-value golden-text">{employeeData.birthDate}</div>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-field">
              <div className="field-label">Dirección</div>
              <div className="field-value golden-text">{employeeData.direccion}</div>
            </div>
            
            <div className="info-field">
              <div className="field-label">Teléfono</div>
              <div className="field-value golden-text">{employeeData.telefono}</div>
            </div>
          </div>

          <div className="info-row">
            <div className="info-field">
              <div className="field-label">Número de Cliente</div>
              <div className="field-value golden-text">{employeeData.num}</div>
            </div>
          </div>
    </div>
  );
};

export default Derecha;