import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../features/auth/authStore";
import "../styles/register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verifica que todos los campos se hayan llenado
    if (!name.trim() || !email.trim() || !username.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    const success = register(name, email, username, password);
    if (success) {
      navigate("/");
    } else {
      setError("El correo o usuario ya existen");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Registrarse</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="outlined-input"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="outlined-input"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="outlined-input"
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" className="register-btn">
            Registrarse
          </button>
        </form>
        <p className="login-link">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
