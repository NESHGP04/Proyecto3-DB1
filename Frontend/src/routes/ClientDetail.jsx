import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/clientDetail.css';
import Navbar from '../components/navigation/Navbar';
import SubMenu from '../components/navigation/SubMenu';
import Derecha from '../components/ClientDetail/Derecha'
import Izquierda from '../components/ClientDetail/Izquierda'

const ClientDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="employee-page">
      {/* Barra de navegación superior */}
      <Navbar /> 

      {/* Barra de subnavegación */}
      <SubMenu />

      {/* Contenido principal */}
      <div className="employee-details-content">
        {/* Columna izquierda - Foto y botones */}
        <Izquierda />
        
        {/* Columna derecha - Información del empleado */}
        <Derecha />
      </div>
    </div>
  );
};

export default ClientDetail;