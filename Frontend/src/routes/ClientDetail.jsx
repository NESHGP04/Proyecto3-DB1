import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/clientDetail.css';
import Navbar from '../components/navigation/Navbar';
import SubMenu1 from '../components/navigation/SubMenu1';
import Derecha from '../components/ClientDetail/Derecha'
import Izquierda from '../components/ClientDetail/Izquierda'
import EditButton from '../components/ClientDetail/EditButton'

const ClientDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="employee-page">
      {/* Barra de navegación superior */}
      <Navbar /> 

      {/* Barra de subnavegación */}
      <SubMenu1 />

      <EditButton />

      {/* Contenido principal */}
      <div className="employee-details-content">
        {/* Columna izquierda - Foto y botones */}
        <Izquierda idPaciente={id}/>
        
        {/* Columna derecha - Información del empleado */}
        <Derecha idPaciente={id}/>
      </div>
    </div>
  );
};

export default ClientDetail;