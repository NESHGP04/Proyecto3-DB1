import '../styles/allClients.css';
import Navbar from '../components/navigation/Navbar';
import Table from '../components/AllClients/Table';
import Button from '../components/AllClients/ButtonAdd';


function AllClients() {

    return (
        <div className="employee-page">
            
            {/* Barra de navegación superior */}
            <Navbar />

            {/* Tabla de empleados */}
            <Table />
            

            {/* Botón agregar */}
            <Button />
        </div>
    );
}

export default AllClients;
