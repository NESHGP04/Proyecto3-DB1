import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/addClients.css";

const Forms = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/clinicas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Clínica registrada con éxito");
        navigate("/clinicas"); // Ajusta según tu ruta de redirección
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error al registrar clínica:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="overlay-box-agregar">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label-forms">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <label className="label-forms">Dirección:</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
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
