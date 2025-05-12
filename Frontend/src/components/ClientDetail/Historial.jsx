import React, { useState, useEffect }  from "react";
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
      
        if (loading) return <p>Cargando historial del paciente...</p>;
        if (error) return <p>Error: {error}</p>;
        if (!paciente) return <p>No se encontró el historial paciente.</p>;

    // const employeeData = {
    //     name: "Angel Mendoza",
    //     birthDate: "11/11/1978",
    //     dpi: "3614874520101",
    //     direccion: "zona 10",
    //     telefono: "56183765",
    //     photo: null,
    //     fecha: "07/05/25",
    //     tratamiento: "Chqueo general",
    //     doctor: "Dr. Alejandro Pérez",
    //     clinica: "Clinik"
    //   };
    
  return (
    <div className="employee-info-container">
          
          <div className="info-row">

          <div className="info-field">
              <div className="field-label">Clinica</div>
              <div className="field-value golden-text">{paciente.id_clinica}</div>
            </div>

            <div className="info-field">
              <div className="field-label">Doctor Encargado</div>
              <div className="field-value golden-text">{paciente.id_medico}</div> {/*FALTA*/}
            </div>

          </div>
          
          <div className="info-row">
            <div className="info-field">
              <div className="field-label">Última cita</div>
              <div className="field-value golden-text">{paciente.citas}</div> {/*o citas?*/}
            </div>
            
            <div className="info-field">
              <div className="field-label">Tratamiento</div>
              <div className="field-value golden-text">{paciente.id_tratamiento}</div>  {/*FALTA*/}
            </div>
          </div>
    </div>
  );
};

export default Derecha;