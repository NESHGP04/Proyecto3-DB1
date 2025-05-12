// Forms para Agregar Cita
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/addClients.css";

const Forms = () => {
  const formRef = useRef(null);

  const { idPaciente, idClinica } = useParams(); // Asegúrate de pasar estos en la ruta
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_medico: "",
    fecha: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cita = {
      id_medico: formData.id_medico,
      id_paciente: idPaciente,
      id_clinica: idClinica,
      fecha: formData.fecha,
    };

    try {
      const response = await fetch("http://localhost:3001/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cita),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Cita registrada con éxito");
        navigate(`/clinicas/${idClinica}/pacientes`); // volver a la lista de pacientes
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error al registrar cita:", error);
    }
  };

  const registerEmployee = {
    id: "ID Paciente:",
    fecha: "Fecha de cita:",
    hora: "Hora:",
    doctor: "ID Doctor(a):"
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
      <form className="form" onSubmit={handleSubmit}>
        <label className="label-forms">{registerEmployee.id}</label>
        <input type="text" value={idPaciente} disabled/>

        <label className="label-forms">{registerEmployee.fecha}</label>
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required/>

        <label className="label-forms">{registerEmployee.doctor}</label>
        <input type="text" name="id_medico" value={formData.id_medico} onChange={handleChange} required />

        <div className="button-register">
            <button type="submit">Registrar</button>
        </div>
        
      </form> 
    </div>
  );
};

export default Forms;
