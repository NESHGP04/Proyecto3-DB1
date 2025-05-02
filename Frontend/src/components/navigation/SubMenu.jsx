
import React from "react";
import "../../styles/SubMenu.css";

const SubMenu = () => {
  return (
    <div className="sub-nav">
        <div className="sub-nav-item">Calendario</div>
        <div className="sub-nav-item">Salarios</div>
        <div className="sub-nav-item">Vacaciones</div>
        <div className="sub-nav-item">Horas extra</div>
        <div className="sub-nav-item">Bonificaciones y descuentos</div>
    </div>
  );
}; 

export default SubMenu;