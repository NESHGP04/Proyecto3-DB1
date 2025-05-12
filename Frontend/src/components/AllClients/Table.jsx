import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/allClients.css";
import foto from "../../assets/logo_azul.png";

const Table = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ID de la clínica desde la URL

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const URL = `http://localhost:3001/clinicas/${id}/pacientes`;

  const showData = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setUsers(data.pacientes || []); // asegúrate de que sea un array
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showData();
  }, [id]);

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const results = !search
    ? users
    : users.filter((c) =>
        c.nombre?.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="table-container">
      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Buscar..."
        className="searchbar"
      />

      {loading ? (
        <p>Cargando pacientes...</p>
      ) : results.length === 0 ? (
        <p>No se encontraron pacientes.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Num. Paciente</th>
              <th>Nombre</th>
              <th>Cita</th>
            </tr>
          </thead>
          <tbody>
            {results.map((paciente) => (
              <tr
                key={paciente.id_paciente}
                className="employee-row"
                onClick={() =>
                  navigate(`/client-detail/${paciente.id_paciente}`)
                }
              >
                <td>
                  <img src={foto} alt="Paciente" className="empleado-img" />
                </td>
                <td>{paciente.id_paciente}</td>
                <td>{paciente.nombre}</td>
                <td>
                  {Array.isArray(paciente.citas) && paciente.citas.length > 0
                    ? "Tiene citas"
                    : "Sin citas"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;