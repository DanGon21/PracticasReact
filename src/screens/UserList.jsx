import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../features/auth/authStore";
import "../styles/userlist.css";  // Asegúrate de tener un archivo de estilo para Users

function Users() {
  // Obtén la lista de usuarios y la función de eliminación desde el store
  const users = useAuthStore((state) => state.users);
  const deleteUser = useAuthStore((state) => state.deleteUser);

  // Función para confirmar y eliminar un usuario
  const handleDelete = (username) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      deleteUser(username);
    }
  };

  return (
    <div className="users-container">
      {/* Toolbar */}
      <div className="users-toolbar">
        <Link to="/dashboard" className="toolbar-button">Ir al Dashboard</Link>
        <h2 className="toolbar-title">Lista de Usuarios</h2>
      </div>

      {/* Lista de usuarios */}
      <div className="users-list">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <div className="user-info">
              <img
                className="user-photo"
                src={user.photo || "https://via.placeholder.com/80"}
                alt="Usuario"
              />
              <div className="user-details">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.username}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(user.username)}
              className="delete-button"
            >
              🗑️ Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
