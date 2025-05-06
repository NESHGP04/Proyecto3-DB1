import React, { useState, useRef, useEffect } from "react";
import "../../styles/addClients.css";

const Forms = () => {
  const [action, setAction] = useState("si"); 
  const formRef = useRef(null);

  const registerEmployee = {
    name: "Nombre paciente:",
    dpi: "DPI",
    fecha: "Fecha de nacimiento:",
    dirección: "Dirección:",
    telefono: "Teléfono:"
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

        <label className="label-forms">{registerEmployee.dpi}</label>
        <input type="text" />

        <label className="label-forms">{registerEmployee.fecha}</label>
        <input type="date" />

        <label className="label-forms">{registerEmployee.dirección}</label>
        <input type="text"/>

        <label className="label-forms">{registerEmployee.telefono}</label>
        <input type="text"/>

        <div className="button-register">
            <button type="submit">Registrar</button>
        </div>
        
      </form>
    </div>
  );
};

export default Forms;
