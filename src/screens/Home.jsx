import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuthStore from "../features/auth/authStore";
import "../styles/homeLogged.css";
import "../styles/home.css";

function Home() {
  const { user } = useAuthStore();
  


  if (user) {
    return (
      <div className="home-logged-container">
        {/* Header con la foto y nombre del usuario */}
        <header className="home-logged-header">
          <div className="home-logged-user-info">
            <img
              className="home-logged-user-photo"
              src={user?.photo || "https://via.placeholder.com/80"}
              alt="Perfil"
            />
            <span className="home-logged-user-name">{user?.name || "Usuario"}</span>
          </div>
        </header>

        {/* Contenido principal con barra lateral */}
        <div className="home-logged-content">
          <nav className="home-logged-sidebar">
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/">App1</Link></li>
              <li>
                <a href="#" onClick={() => useAuthStore.getState().logout()}>
                  Cerrar sesión
                </a>
              </li>
            </ul>
          </nav>

          {/* Contenido de la página */}
          <main className="home-logged-main-content">
            <h2>Bienvenido, {user?.name || "Usuario"}</h2>
            <p>Explora las opciones desde el menú lateral.</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="toolbar">
        <div className="toolbar-buttons">
          <Link to="/login" className="btn btn-login">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="btn btn-register">
            Registrarse
          </Link>
        </div>
      </header>

      <div className="home-logged-content">
          <nav className="home-logged-sidebar">
            <ul>
              <li><Link to="/app1">App1</Link></li>
              <li><Link to="/app1">App2</Link></li>
              <li><Link to="/app1">App3</Link></li>
            </ul>
          </nav>
      
      <main className="main-content">
        <h1>Bienvenido a nuestra aplicación</h1>
        <p>
          Esta es la página de inicio para usuarios sin sesión iniciada.
          Explora nuestras funciones y regístrate para obtener acceso completo.
        </p>
      </main>
    </div>
    </div>
  );
}

export default Home;
