import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../features/auth/authStore";
import "../styles/userlist.css";

function OrgList() {
  const organizaciones = useAuthStore((state) => state.organizaciones);
  const deleteOrganizacion = useAuthStore((state) => state.deleteOrganizacion);

  const handleDeleteOrganizacion = (nombre) => {
    if (window.confirm("¿Estás seguro de eliminar esta organización?")) {
      deleteOrganizacion(nombre);
    }
  };

  return (
    <div className="users-container">
      {/* Toolbar */}
      <div className="users-toolbar">
        <Link to="/dashboard" className="toolbar-button">Ir al Dashboard</Link>
        <h2 className="toolbar-title">Lista de  Organizaciones</h2>
      </div>
       {/* Lista de Organizaciones */}
       <h3 className="section-title">Organizaciones</h3>
      <div className="users-list">
        {organizaciones.map((org, index) => (
          <div key={index} className="user-card">
            <div className="user-info">
              <div className="user-details">
                <h3>{org.nombre}</h3>
                <p>{org.direccion}</p>
                <p>{org.telefono}</p>
              </div>
            </div>
            <button onClick={() => handleDeleteOrganizacion(org.nombre)} className="delete-button">
              🗑️ Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrgList;