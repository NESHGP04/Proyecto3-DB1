// Forms para agregar Pacientes
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/addClients.css";

const Forms = () => {
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  const { id } = useParams(); // <- viene como 'id' desde la ruta
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

    const clinicaId = parseInt(id);

    if (isNaN(clinicaId)) {
      alert("Error: ID de clínica no válido.");
      return;
    }

    const paciente = {
      nombre,
      fecha_nacimiento: fechaNacimiento,
      direccion,
      telefono,
      id_clinica: clinicaId
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
      navigate(`/all-clinics/${id}/all-clients`);
    } catch (error) {
      console.error("Error al registrar paciente:", error);
      alert("Error de red al registrar paciente");
    }
  };

  // Este useEffect parece estar incompleto (¿falta handleScroll?)
  useEffect(() => {
    const handleScroll = () => {};
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
        <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />

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
