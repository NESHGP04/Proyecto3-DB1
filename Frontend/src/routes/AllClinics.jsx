import '../styles/allClients.css';
import Navbar from '../components/navigation/Navbar';
import Table from '../components/AllClinics/Table';
import Button from '../components/AllClinics/ButtonAdd';


function AllClinics(){
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

export default AllClinics;