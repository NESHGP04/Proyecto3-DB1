import React, { useState, useRef, useEffect } from "react";
import "../../styles/addClients.css";

const Forms = () => {
  const [action, setAction] = useState("si"); 
  const formRef = useRef(null);

  const registerEmployee = {
    id: "ID Paciente:",
    fecha: "Fecha de cita:",
    hora: "Hora:",
    doctor: "Doctor(a):"
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
        <label className="label-forms">{registerEmployee.id}</label>
        <input type="text" />

        <label className="label-forms">{registerEmployee.fecha}</label>
        <input type="date" />

        <label className="label-forms">{registerEmployee.hora}</label>
        <input type="text"/>

        <label className="label-forms">{registerEmployee.doctor}</label>
        <input type="text"/>

        <div className="button-register">
            <button type="submit">Registrar</button>
        </div>
        
      </form>
    </div>
  );
};

export default Forms;
