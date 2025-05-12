import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/Home';
import AllClients from './routes/AllClients';
import AddClients from './routes/AddClients';
import ClientDetail from './routes/ClientDetail';
import Reports from './routes/Reports';
import AddCitas from './routes/AddCita';
import Edit from './routes/Edit';
import AllClinics from './routes/AllClinics';
import AddClinica from './routes/AddClinica';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* ALL... */}
          <Route path="/all-clinics/:id/all-clients" element={<AllClients />} />
          <Route path="/all-clinics" element={<AllClinics />} />  

          {/* ADD... */}
          <Route path="/all-clinics/:id_clinica/add-client" element={<AddClients />} />
          <Route path="/add-clinic" element={<AddClinica />} />  
          <Route path="/all-clinics/:idClinica/all-clients/:idPaciente/add-citas" element={<AddCitas />} />  

          <Route path="/edit" element={<Edit />} />  {/* EDIT */}

          {/* DETAIL */}
          <Route path="/client-detail/:id" element={<ClientDetail />} />  
          
          {/* REPORTS */}
          <Route path="/reports" element={<Reports />} />  
          
          {/* Catch‑all */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App
