import React, { useState, useRef, useEffect } from "react";
import "../../styles/addClients.css";

const Forms = () => {
  const [action, setAction] = useState("si"); 
  const formRef = useRef(null);

  const editEmployee = {
    id: "ID Paciente:",
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

      <label className="label-forms">{editEmployee.id}</label>
      <input type="text"/>

        <label className="label-forms">{editEmployee.dirección}</label>
        <input type="text"/>

        <label className="label-forms">{editEmployee.telefono}</label>
        <input type="text"/>

        <div className="button-register">
            <button type="submit">Editar</button>
        </div>
        
      </form>
    </div>
  );
};

export default Forms;
