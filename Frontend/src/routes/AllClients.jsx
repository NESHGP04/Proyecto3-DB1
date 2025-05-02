import '../styles/allClients.css';
import foto from "../assets/logo_med.png";
import Navbar from '../components/navigation/Navbar';
import Table from '../components/AllClients/Table';
import Button from '../components/AllClients/ButtonAdd';


function AllClients() {
    const clientes = [
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

    return (
        <div className="employee-page">
            
            {/* Barra de navegación superior */}
            <Navbar />

            {/* Buscador */}
            {/* <SearchBar /> */}

            {/* Tabla de empleados */}
            <Table />
            

            {/* Botón agregar */}
            <Button />
        </div>
    );
}

export default AllClients;
