
import React from "react";
import "../../styles/reports.css";

const Derecha = () => {
    
  return (
    <div className="employee-info-container">
          <div className="info-row">
            <div className="info-field">
              <button className="report-btn">Médicos</button>
            </div>
            
            <div className="info-field">
                <button className="report-btn">Citas</button>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-field">
                <button className="report-btn">Consultas</button>
            </div>
            
            <div className="info-field">
                <button className="report-btn">Facturación</button>
            </div>
          </div>

    </div>
  );
};

export default Derecha;