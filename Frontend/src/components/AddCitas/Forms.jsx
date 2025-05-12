//Formulario para Agregar Citas
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/addClients.css";

const Forms = () => {
  const { idPaciente, idClinica } = useParams();
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
      id_medico: parseInt(formData.id_medico),
      id_paciente: parseInt(idPaciente),
      id_clinica: parseInt(idClinica),
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
        navigate(`/clinicas/${idClinica}/pacientes`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error al registrar cita:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  const labels = {
    id: "ID Paciente:",
    fecha: "Fecha de cita:",
    doctor: "ID Doctor(a):"
  };

  return (
    <div className="overlay-box-agregar">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label-forms">{labels.id}</label>
        <input type="text" value={idPaciente} disabled />

        <label className="label-forms">{labels.fecha}</label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />

        <label className="label-forms">{labels.doctor}</label>
        <input
          type="number"
          name="id_medico"
          value={formData.id_medico}
          onChange={handleChange}
          required
        />

        <div className="button-register">
          <button type="submit">Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default Forms;