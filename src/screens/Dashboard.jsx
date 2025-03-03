import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import useAuthStore from "../features/auth/authStore";
import { revenueData, genderDistributionData } from "./data.js"; // Importa los datos

import "../styles/dashboard.css";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const { user } = useAuthStore();
  const [averageRevenue, setAverageRevenue] = useState(0);

  // Tasa de cambio de dólares a euros
  const exchangeRate = 0.85; // 1 USD = 0.85 EUR

  // Si no hay usuario, redirigir al login
  if (!user) {
    return <Navigate to="/" />;
  }

  // Calcular la media de dinero ganado en el año
  useEffect(() => {
    const totalRevenue = revenueData.reduce((acc, data) => acc + data.amount, 0);
    const average = totalRevenue / revenueData.length;
    setAverageRevenue(average);
  }, []);

  // Preparar los datos para el gráfico de líneas
  const chartData = {
    labels: revenueData.map((data) => data.month), // Meses
    datasets: [
      {
        label: "Dinero Ganado (en $)",
        data: revenueData.map((data) => data.amount), // Cantidad de dinero por mes en USD
        borderColor: "#4CAF50", // Color de la línea
        backgroundColor: "rgba(76, 175, 80, 0.2)", // Color de fondo
        fill: true,
        tension: 0.4, // Curvatura de la línea
      },
      {
        label: "Dinero Ganado (en €)",
        data: revenueData.map((data) => data.amount * exchangeRate), // Convertir a EUR
        borderColor: "#3b8d99", // Color de la línea para EUR
        backgroundColor: "rgba(59, 141, 153, 0.2)", // Color de fondo para EUR
        fill: true,
        tension: 0.4, // Curvatura de la línea
      },
    ],
  };

  // Preparar los datos para el gráfico de tarta (género)
  const pieData = {
    labels: genderDistributionData.map((data) => {
      switch (data.gender) {
        case "Male":
          return "Masculino";
        case "Female":
          return "Femenino";
        case "Unknown":
          return "Desconocido";
        default:
          return "No especificado";
      }
    }),
    datasets: [
      {
        data: genderDistributionData.map((data) => data.count),
        backgroundColor: ["#4CAF50", "#3b8d99", "#f4b400"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">Panel de Control</header>
      <div className="dashboard-content">
      <nav className="sidebar2">
  <ul>
    <li><Link to="/">Inicio</Link></li>
    <li><strong>Personal</strong></li> 
    <li><Link to="/usuarios">Usuarios</Link></li>
    <li><Link to="/clientes">Clientes</Link></li>
    <li><Link to="/organizaciones">Organizaciones</Link></li>
    <li><strong>Formularios</strong></li>
    <li><Link to="/usuariosform">Formulario de Usuarios</Link></li>
    <li><Link to="/clientesform">Formulario de Clientes</Link></li>
    <li><Link to="/organizacionesform">Formulario de Organizaciones</Link></li>
    <li><strong>Cuenta</strong></li>
    <li><a href="#">Configuración</a></li>
    <li>
      <a href="#" onClick={() => useAuthStore.getState().logout()}>
        Cerrar sesión
      </a>
    </li>
  </ul>
</nav>
        <main className="main-content">
          <div className="dashboard-cards-container">
            {/* Card con el gráfico de líneas */}
            <div className="dashboard-card">
              <h3>Dinero Ganado en el Año</h3>
              <div className="chart-container">
                <Line data={chartData} />
              </div>
            </div>

            {/* Card con la media de dinero ganado */}
            <div className="dashboard-card-avg">
              <h3>Media de Ganancias del Año</h3>
              <p>${averageRevenue.toFixed(2)} / €{(averageRevenue * exchangeRate).toFixed(2)}</p>
            </div>

            {/* Card con el gráfico de tarta */}
            <div className="dashboard-card">
              <h3>Distribución por Género</h3>
              <div className="chart-container">
                <Pie data={pieData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
