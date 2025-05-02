
import React from "react";
import "../../styles/clientDetail.css";

const Derecha = () => {

    const employeeData = {
        name: "Angel Mendoza",
        nit: "3460854-7",
        birthDate: "11/11/1978",
        position: "Gerente de ventas",
        dpi: "3008366610101",
        salary: "Q 8,000.00",
        igssAffiliation: "56789",
        baseHours: "9 horas",
        photo: null
      };
    
  return (
    <div className="employee-info-container">
          <div className="info-row">
            <div className="info-field">
              <div className="field-label">Nombre</div>
              <div className="field-value golden-text">{employeeData.name}</div>
            </div>
            
            <div className="info-field">
              <div className="field-label">NIT</div>
              <div className="field-value golden-text">{employeeData.nit}</div>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-field">
              <div className="field-label">Fecha de nacimiento</div>
              <div className="field-value golden-text">{employeeData.birthDate}</div>
            </div>
            
            <div className="info-field">
              <div className="field-label">Departamento y puesto</div>
              <div className="field-value golden-text">{employeeData.position}</div>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-field">
              <div className="field-label">DPI</div>
              <div className="field-value golden-text">{employeeData.dpi}</div>
            </div>
            
            <div className="info-field">
              <div className="field-label">Salario base</div>
              <div className="field-value golden-text">{employeeData.salary}</div>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-field">
              <div className="field-label">Afiliación IGSS</div>
              <div className="field-value golden-text">{employeeData.igssAffiliation}</div>
            </div>
            
            <div className="info-field">
              <div className="field-label">Horas base</div>
              <div className="field-value golden-text">{employeeData.baseHours}</div>
            </div>
          </div>
    </div>
  );
};

export default Derecha;