import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/Home';
import AllClients from './routes/AllClients';
import AddClients from './routes/AddClients';
import ClientDetail from './routes/ClientDetail';
import Reports from './routes/Reports';
import AddCitas from './routes/AddCita';
import Edit from './routes/Edit';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-clients" element={<AllClients />} />
          <Route path="/add-clients" element={<AddClients />} />  
          <Route path="/client-detail" element={<ClientDetail />} />  
          <Route path="/add-citas" element={<AddCitas />} />  
          <Route path="/reports" element={<Reports />} />  
          <Route path="/edit" element={<Edit />} />  

          {/* Catch‑all */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App
