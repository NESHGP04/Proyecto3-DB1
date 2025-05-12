import '../styles/addClients.css';
import '../styles/allClients.css';
import Navbar from '../components/navigation/Navbar';
import Forms from '../components/AddClinica/Forms';

function AddClinica(){
    return (
        <div className="background">
            <div className="employee-page">
                {/* Barra de navegación superior */}
                <Navbar />
            </div>

            {/* Forms para registro */}
            <Forms />
        </div>
    );
}

export default AddClinica;