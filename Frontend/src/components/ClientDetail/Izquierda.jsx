import React from "react";
import "../../styles/clientDetail.css";

const Izquierda = () => {
    // Cambiar con datos reales
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
    <div className="employee-sidebar">
        <div className="employee-photo-container">
        {employeeData.photo ? (
          <img
            src={employeeData.photo}
            alt={employeeData.name}
            className="employee-photo"
          />
        ) : (
          <div className="employee-photo-placeholder"></div>
        )}
      </div>
    </div>
  );
    
};

export default Izquierda;