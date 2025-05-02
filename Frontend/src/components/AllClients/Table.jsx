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

    //EJ Empleados
    const empleados = [
            { id: '1', nombre: 'Ana López', puesto: 'Desarrolladora', departamento: 'Tecnología', imagen: foto },
            { id: '2', nombre: 'Ana López', puesto: 'Desarrolladora', departamento: 'Tecnología', imagen: foto },
            { id: '3', nombre: 'Ana López', puesto: 'Desarrolladora', departamento: 'Tecnología', imagen: foto },
            { id: '2', nombre: 'Ana López', puesto: 'Desarrolladora', departamento: 'Tecnología', imagen: foto },
            { id: '2', nombre: 'Ana López', puesto: 'Desarrolladora', departamento: 'Tecnología', imagen: foto },
            { id: '2', nombre: 'Ana López', puesto: 'Desarrolladora', departamento: 'Tecnología', imagen: foto },
            { id: '2', nombre: 'Ana López', puesto: 'Desarrolladora', departamento: 'Tecnología', imagen: foto },
            // más empleados...
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
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Puesto</th>
                        <th>Departamento</th>
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
                        <td>{empleado.puesto}</td>
                        <td>{empleado.departamento}</td>
                    </tr>
                   ))}
                </tbody>
            </table>
        </div>

    );
};

export default Table;