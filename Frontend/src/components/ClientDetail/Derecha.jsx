
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
        hora: "13:00",
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
              <div className="field-label">DPI</div>
              <div className="field-value golden-text">{employeeData.dpi}</div>
            </div>

            <div className="info-field">
              <div className="field-label">Doctor Encargado</div>
              <div className="field-value golden-text">{employeeData.doctor}</div>
            </div>

          </div>
          
          <div className="info-row">
            <div className="info-field">
              <div className="field-label">Próxima cita</div>
              <div className="field-value golden-text">{employeeData.fecha}</div>
            </div>
            
            <div className="info-field">
              <div className="field-label">Hora</div>
              <div className="field-value golden-text">{employeeData.hora}</div>
            </div>
          </div>
    </div>
  );
};

export default Derecha;