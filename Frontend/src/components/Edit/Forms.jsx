//Forms para Editar infomación de un paciente específico
import React, { useState, useRef, useEffect } from "react";
import "../../styles/addClients.css";

const Forms = () => {
  const [id, setId] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/pacientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ direccion, telefono })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Paciente actualizado con éxito");
        console.log(data);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      alert("Hubo un error al actualizar el paciente.");
    }
  };

  return (
    <div className="overlay-box-agregar">
      <form className="form">

      <label className="label-forms">{editEmployee.id}</label>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)}/>

        <label className="label-forms">{editEmployee.dirección}</label>
        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)}/>

        <label className="label-forms">{editEmployee.telefono}</label>
        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>

        <div className="button-register">
            <button type="submit">Editar</button>
        </div>
        
      </form>
    </div>
  );
};

export default Forms;
