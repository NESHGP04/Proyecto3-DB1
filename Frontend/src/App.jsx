import Home from './routes/Home';
import AllClients from './routes/AllClients';
import AddClients from './routes/AddClients';
import ClientDetail from './routes/ClientDetail';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-clients" element={<AllClients />} />
          <Route path="/add-clients" element={<AddClients />} />  
          <Route path="/client-detail" element={<ClientDetail />} />  

          {/* Catch‑all */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App
