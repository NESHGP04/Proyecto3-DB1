import '../styles/addClients.css';
import '../styles/allClients.css';
import logo from "../assets/logo.png";
import Navbar from '../components/navigation/Navbar';
import Forms from '../components/AddClients/Forms';


function AddClients(){
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

export default AddClients;