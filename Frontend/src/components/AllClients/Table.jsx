import React, { useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/allClients.css";
import foto from "../../assets/logo_azul.png";

const Table = () => {
    const navigate = useNavigate();
    
    //hooks
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    //funcion para api CAMBIAR PARA LA NUESTRA
    const URL = 'https://jsonplaceholder.typicode.com/users'

    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        // console.log(data)
        setUsers(data)
    }
    showData()

    //EJ Pacientes
    const empleados = [
            { id: '3614874320101', nombre: 'Ana López', cita: '05/05/25 13:00', doctor: 'Dr. Alejandro Pérez', imagen: foto },
            { id: '3614874320101', nombre: 'Ana López', cita: '05/05/25 13:00', doctor: 'Dr. Alejandro Pérez', imagen: foto },
            { id: '3614874320101', nombre: 'Ana López', cita: '05/05/25 13:00', doctor: 'Dr. Alejandro Pérez', imagen: foto },
            { id: '3614874320101', nombre: 'Ana López', cita: '05/05/25 13:00', doctor: 'Dr. Alejandro Pérez', imagen: foto },
            { id: '3614874320101', nombre: 'Ana López', cita: '05/05/25 13:00', doctor: 'Dr. Alejandro Pérez', imagen: foto },
            { id: '3614874320101', nombre: 'Ana López', cita: '05/05/25 13:00', doctor: 'Dr. Alejandro Pérez', imagen: foto },
            { id: '3614874320101', nombre: 'Ana López', cita: '05/05/25 13:00', doctor: 'Dr. Alejandro Pérez', imagen: foto },
            { id: '3614874320101', nombre: 'Ana López', cita: '05/05/25 13:00', doctor: 'Dr. Alejandro Pérez', imagen: foto },
            { id: '3614874320101', nombre: 'Ana López', cita: '05/05/25 13:00', doctor: 'Dr. Alejandro Pérez', imagen: foto },
            // más pacientes...
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

            <input value={search} onChange={searcher} type="text" placeholder="Buscar..." className="searchbar"/>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>DPI</th>
                        <th>Nombre</th>
                        <th>Cita</th>
                        <th>Doctor</th>
                    </tr>
                </thead>
                <tbody>
                {empleados.map((empleado) => (
                    <tr key={empleado.id} className="employee-row" onClick={() => navigate("/client-detail")}>
                        <td>
                            <img src={empleado.imagen} alt="Empleado" className="empleado-img" />
                        </td>
                        <td>{empleado.id}</td>
                        <td>{empleado.nombre}</td>
                        <td>{empleado.cita}</td>
                        <td>{empleado.doctor}</td>
                    </tr>
                   ))}
                </tbody>
            </table>
        </div>

    );
};

export default Table;