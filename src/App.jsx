import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import NotFound from "./screens/NotFound";
import UserList from "./screens/UserList";
import ClientList from "./screens/ClientList";
import OrgList from "./screens/OrgList";
import ClientesForm from './components/ClientesForm';
import OrganizacionesForm from './components/OrganizacionesForm';
import UsuariosForm from './components/UsuariosForm';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/usuarios" element={<UserList />} />
        <Route path="/clientes" element={<ClientList />} />
        <Route path="/organizaciones" element={<OrgList />} />
        <Route path="/clientesform" element={<ClientesForm />} />
        <Route path="/organizacionesform" element={<OrganizacionesForm />} />
        <Route path="/usuariosform" element={<UsuariosForm />} />
      </Routes>
    </>
  );
}


export default App;
