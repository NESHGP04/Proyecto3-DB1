import '../styles/addClients.css';
import '../styles/allClients.css';
import Navbar from '../components/navigation/Navbar';
import Forms from '../components/Edit/Forms';

function Edit(){
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

export default Edit; 