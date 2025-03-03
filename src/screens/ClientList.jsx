import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../features/auth/authStore";
import "../styles/userlist.css";

function ClientList() {
    const clientes = useAuthStore((state) => state.clientes);
    const deleteCliente = useAuthStore((state) => state.deleteCliente);
  
    const handleDeleteCliente = (email) => {
      if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
        deleteCliente(email);
      }
    };

    return (
        <div className="users-container">
          {/* Toolbar */}
          <div className="users-toolbar">
            <Link to="/dashboard" className="toolbar-button">Ir al Dashboard</Link>
            <h2 className="toolbar-title">Lista de Clientes </h2>
          </div>
    
          {/* Lista de Clientes */}
          <div className="users-list">
            {clientes.map((cliente, index) => (
              <div key={index} className="user-card">
                <div className="user-info">
                  <div className="user-details">
                    <h3>{cliente.nombre}</h3>
                    <p>{cliente.email}</p>
                    <p>{cliente.telefono}</p>
                  </div>
                </div>
                <button onClick={() => handleDeleteCliente(cliente.email)} className="delete-button">
                  🗑️ Eliminar
                </button>
              </div>
            ))}
          </div>
          </div>
  );
}

export default ClientList;