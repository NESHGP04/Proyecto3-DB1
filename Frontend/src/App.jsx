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
          <Route
            path="/all-clinics/:id/all-clients/add-client"
            element={<AddClients />}
          />
          <Route path="/add-clinic" element={<AddClinica />} />  
          <Route path="/client-detail/:idPaciente/add-cita" element={<AddCitas />} />

          {/* EDIT */}
          <Route path="/edit" element={<Edit />} />  

          {/* DETAIL */}
          <Route path="/client-detail/:id" element={<ClientDetail />} />  
          
          {/* REPORTS */}
          <Route path="/reports" element={<Reports />} />  
          
        </Routes>
    </BrowserRouter>
  )
}

export default App
