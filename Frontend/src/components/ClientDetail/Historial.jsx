
import React from "react";
import "../../styles/clientDetail.css";

const Derecha = () => {

    const employeeData = {
        name: "Angel Mendoza",
        birthDate: "11/11/1978",
        dpi: "3614874520101",
        direccion: "zona 10",
        telefono: "56183765",
        photo: null,
        fecha: "07/05/25",
        tratamiento: "Chqueo general",
        doctor: "Dr. Alejandro Pérez",
        clinica: "Clinik"
      };
    
  return (
    <div className="employee-info-container">
          
          <div className="info-row">

          <div className="info-field">
              <div className="field-label">Clinica</div>
              <div className="field-value golden-text">{employeeData.clinica}</div>
            </div>

            <div className="info-field">
              <div className="field-label">Doctor Encargado</div>
              <div className="field-value golden-text">{employeeData.doctor}</div>
            </div>

          </div>
          
          <div className="info-row">
            <div className="info-field">
              <div className="field-label">Última cita</div>
              <div className="field-value golden-text">{employeeData.fecha}</div>
            </div>
            
            <div className="info-field">
              <div className="field-label">Tratamiento</div>
              <div className="field-value golden-text">{employeeData.tratamiento}</div>
            </div>
          </div>
    </div>
  );
};

export default Derecha;