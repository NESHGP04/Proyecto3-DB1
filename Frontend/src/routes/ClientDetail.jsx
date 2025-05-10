import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/clientDetail.css';
import Navbar from '../components/navigation/Navbar';
import SubMenu1 from '../components/navigation/SubMenu1';
import SubMenu2 from '../components/navigation/SubMenu2';
import Derecha from '../components/ClientDetail/Derecha'
import Izquierda from '../components/ClientDetail/Izquierda'
import Historial from '../components/ClientDetail/Historial'
import EditButton from '../components/ClientDetail/EditButton'

const ClientDetail = () => {
  const navigate = useNavigate();

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
        <Izquierda />
        
        {/* Columna derecha - Información del empleado */}
        <Derecha />
      </div>

      <SubMenu2 />

      <div className="employee-details-content">
        {/* Columna derecha - Información del empleado */}
        <Historial />
      </div>
    </div>
  );
};

export default ClientDetail;