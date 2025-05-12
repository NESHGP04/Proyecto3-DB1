//Forms para Agregar Clientes
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/addClients.css";

const Forms = () => {
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const { id_clinica } = useParams(); //id_clinica viene en la URL como /clinica/:id_clinica
  const navigate = useNavigate();
  const formRef = useRef(null);

  const registerEmployee = {
    name: "Nombre paciente:",
    fecha: "Fecha de nacimiento:",
    dirección: "Dirección:",
    telefono: "Teléfono:"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paciente = {
      nombre,
      fecha_nacimiento: fechaNacimiento,
      direccion,
      telefono,
      id_clinica: parseInt(id_clinica)
    };

    try {
      const response = await fetch("http://localhost:3001/pacientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paciente)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Ocurrió un error al registrar el paciente.");
        return;
      }

      alert("Paciente registrado con éxito");
      navigate("/dashboard"); // Cambia la ruta 
    } catch (error) {
      console.error("Error al registrar paciente:", error);
      alert("Error de red al registrar paciente");
    }
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
      <form className="form" onSubmit={handleSubmit} ref={formRef}>
        <label className="label-forms">{registerEmployee.name}</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label className="label-forms">{registerEmployee.fecha}</label>
        <input type="date" value={fechaNacimiento}  onChange={(e) => setFechaNacimiento(e.target.value)} required />

        <label className="label-forms">{registerEmployee.dirección}</label>
        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required/>

        <label className="label-forms">{registerEmployee.telefono}</label>
        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required/>

        <div className="button-register">
            <button type="submit">Registrar</button>
        </div>
        
      </form>
    </div>
  );
};

export default Forms;
