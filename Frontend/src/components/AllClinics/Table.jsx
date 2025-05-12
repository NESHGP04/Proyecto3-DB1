import React, { useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/allClients.css";

const Table = () => {
    const navigate = useNavigate();
    
    //hooks
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    //funcion para api CAMBIAR PARA LA NUESTRA
    const URL = 'http://localhost:3001/clinicas'

    const showData = async () => {
        try {
          const response = await fetch(URL);
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error al obtener clínicas:", error);
        }
    };

    useEffect(() => {
        showData();
    }, [])

    // funcion busqueda
    const searcher = (e) => {
        setSearch(e.target.value);
      };
      
    //metodo de filtrado 
    const results = !search
        ? users
        : users.filter((c) =>
            c.nombre.toLowerCase().includes(search.toLowerCase())
          );


    return(
        <div className="table-container">
            <input type="text" value={search} onChange={searcher} placeholder="Buscar..." className="searchbar"/> 

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Num. Clínica</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                {results && results.map((clinica) => (
                    <tr 
                        key={clinica.id_clinica}
                        className="employee-row"
                        onClick={() => navigate(`/all-clinics/${clinica.id_clinica}/all-clients`)}
                    >
                        <td>{clinica.id_clinica}</td>
                        <td>{clinica.nombre}</td>
                    </tr>
                   ))}
                </tbody>
            </table>
        </div>

    );
};

export default Table;