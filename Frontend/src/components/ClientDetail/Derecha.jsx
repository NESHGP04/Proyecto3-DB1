import React, { useState, useEffect }  from "react";
import { useParams } from "react-router-dom";
import "../../styles/clientDetail.css";

const Derecha = ({idPaciente}) => {

  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await fetch(`http://localhost:3001/pacientes/${idPaciente}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el paciente');
        }
        const data = await response.json();
        setPaciente(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPaciente();
  }, [idPaciente]);

  if (loading) return <p>Cargando datos del paciente...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!paciente) return <p>No se encontró el paciente.</p>;
    
  return (
    <div className="employee-info-container">

          <div className="info-row">
            <div className="info-field">
              <div className="field-label">Nombre</div>
              <div className="field-value golden-text">{paciente.nombre}</div>
            </div>
            
            <div className="info-field">
              <div className="field-label">Fecha de Nacimiento</div>
              <div className="field-value golden-text">{paciente.fecha_nacimiento}</div>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-field">
              <div className="field-label">Dirección</div>
              <div className="field-value golden-text">{paciente.direccion}</div>
            </div>
            
            <div className="info-field">
              <div className="field-label">Teléfono</div>
              <div className="field-value golden-text">{paciente.telefono}</div>
            </div>
          </div>

          <div className="info-row">
            <div className="info-field">
              <div className="field-label">Número de Cliente</div>
              <div className="field-value golden-text">{paciente.id_paciente}</div>
            </div>
          </div>
    </div>
  );
};

export default Derecha;