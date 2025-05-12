//Forms para Agregar Clínica
import React, { useState, useRef, useEffect } from "react";
import "../../styles/addClients.css";

const Forms = () => {
  const formRef = useRef(null);

  const [clinicaData, setClinicaData] = useState({
    nombre: "",
    direccion: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClinicaData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/clinicas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(clinicaData)
      });

      if (!response.ok) {
        throw new Error("Error al registrar la clínica");
      }

      const data = await response.json();
      alert(data.message);
      setClinicaData({ nombre: "", direccion: "" });
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al enviar el formulario");
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
      <form className="form" onSubmit={handleSubmit}>
        <label className="label-forms">Nombre Clínica:</label>
        <input
          type="text"
          name="nombre"
          value={clinicaData.nombre}
          onChange={handleChange}
          required
        />

        <label className="label-forms">Dirección:</label>
        <input
          type="text"
          name="direccion"
          value={clinicaData.direccion}
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
