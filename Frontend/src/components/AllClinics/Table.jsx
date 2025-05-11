import React, { useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/allClients.css";

const Table = () => {
    const navigate = useNavigate();
    
    //hooks
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    const [datas, setdatas] = useState([]);

    //funcion para api CAMBIAR PARA LA NUESTRA
    const URL = 'https://jsonplaceholder.typicode.com/users'

    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        // console.log(data)
        setUsers(data.results);
    }

    useEffect(() => {
        showData();
    }, [])

    //EJ Pacientes
    const clinicas = [
            { id: '01', nombre: 'Clinik' },
            { id: '01', nombre: 'Clinik' },
            { id: '01', nombre: 'Clinik' },
            { id: '01', nombre: 'Clinik' },
            // más clinicas...
            //cambiarlo con datos DB
    ];

    // funcion busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
        //console.log(e.target.value)
    }

    //metodo de filtrado 
    const results = !search ? users : users.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase()))

    useEffect( ()=> {
        showData() 
    }, [])

    return(
        <div className="table-container">

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Num. Clínica</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                {clinicas.map((empleado) => (
                    <tr key={empleado.id} className="employee-row" onClick={() => navigate("/all-clients")}>
                        <td>{empleado.id}</td>
                        <td>{empleado.nombre}</td>
                    </tr>
                   ))}
                </tbody>
            </table>
        </div>

    );
};

export default Table;