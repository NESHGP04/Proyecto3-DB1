import React, { useState, useRef, useEffect } from "react";
import "../../styles/addClients.css";

const Forms = () => {
  const [action, setAction] = useState("si"); 
  const formRef = useRef(null);

  const registerEmployee = {
    name: "Nombre empleado:",
    fecha: "Fecha de nacimiento:",
    tiene_iggs: "Tiene IGGS:",
    iggs: "Afiliación IGGS:",
    dpi: "DPI:",
    nit: "NIT:",
    cuenta: "Cuenta bancaria:"
  };

  useEffect(() => {
    const form = formRef.current;
    if (form) {
      form.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (form) {
        form.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="overlay-box-agregar">
      <form className="form">
        <label className="label-forms">{registerEmployee.name}</label>
        <input type="text" />

        <label className="label-forms">{registerEmployee.fecha}</label>
        <input type="date" />

        <label className="label-forms">{registerEmployee.dpi}</label>
        <input type="text"/>
        
        <label htmlFor="accion" className="label-forms">{registerEmployee.tiene_iggs}</label>
        <select
          id="accion"
          className="select-action-forms"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>

        <label className="label-forms">{registerEmployee.iggs}</label>
        <input type="text"/>

        <label className="label-forms">{registerEmployee.nit}</label>
        <input type="text"/>

        <label className="label-forms">{registerEmployee.cuenta}</label>
        <input type="text"/>

        <div className="button-register">
            <button type="submit">Registrar</button>
        </div>
        
      </form>
    </div>
  );
};

export default Forms;
