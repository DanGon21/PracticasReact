import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../features/auth/authStore"; // Ajusta la ruta según tu estructura
import "../styles/login.css"; // Ajusta la ruta según tu estructura


function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    const success = login(identifier, password);
    if (success) {
      navigate("/");
    } else {
      setError("Correo, usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="outlined-input"
            type="text"
            placeholder="Correo o Usuario"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <input
            className="outlined-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="button-group">
            <button type="button" onClick={() => navigate("/register")}>
              Crear Cuenta
            </button>
            <button type="submit">Siguiente</button>
          </div>
        </form>
      </div>
    </div>
  );  
}

export default Login;
