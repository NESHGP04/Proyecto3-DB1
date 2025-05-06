import Navbar from '../components/navigation/Navbar';
import ButtonReports from '../components/Reports/ButtonReports'

function Reports(){
    return(
        <div className="employee-page">
            {/* Barra de navegación superior */}
            <Navbar /> 

            {/* Barra de subnavegación */}
            <div className="sub-nav">
                <h2>Generar Reportes</h2>
            </div>

            {/* Contenido principal */}
            <div className="employee-details-content">
                {/* Botones para generar reportes */}
                <ButtonReports />
            </div>
        </div>
        
    );
}

export default Reports;