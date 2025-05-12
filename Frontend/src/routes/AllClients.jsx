import '../styles/allClients.css';
import Navbar from '../components/navigation/Navbar';
import Table from '../components/AllClients/Table';
import Button from '../components/AllClients/ButtonAdd';
import { useParams } from 'react-router-dom';

function AllClients() {
    const { id } = useParams();

    return (
        <div className="employee-page">
            
            {/* Barra de navegación superior */}
            <Navbar />

            {/* Tabla de empleados */}
            <Table idClinica={id}/>
            
            {/* Botón agregar */}
            <Button />
        </div>
    );
}

export default AllClients;
