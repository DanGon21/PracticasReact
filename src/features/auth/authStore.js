import { create } from "zustand";

// Recupera datos desde localStorage
const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const storedUsers = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
const storedClientes = localStorage.getItem("clientes") ? JSON.parse(localStorage.getItem("clientes")) : [];
const storedOrganizaciones = localStorage.getItem("organizaciones") ? JSON.parse(localStorage.getItem("organizaciones")) : [];

const useAuthStore = create((set, get) => ({
  user: storedUser,
  users: storedUsers,
  clientes: storedClientes,
  organizaciones: storedOrganizaciones,
  
  login: (identifier, password) => {
    const { users } = get();
    const foundUser = users.find(
      (u) => (u.email === identifier || u.username === identifier) && u.password === password
    );
    if (foundUser) {
      const newUser = { name: foundUser.name, email: foundUser.email, username: foundUser.username };
      set({ user: newUser });
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    }
    return false;
  },
  
  register: (name, email, username, password) => {
    const { users } = get();
    const exists = users.some((u) => u.email === email || u.username === username);
    if (exists) return false;
    const newUser = { name, email, username, password };
    const updatedUsers = [...users, newUser];
    set({ users: updatedUsers });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    const userToSet = { name, email, username };
    set({ user: userToSet });
    localStorage.setItem("user", JSON.stringify(userToSet));
    return true;
  },

  registerCliente: (nombre, email, telefono) => {
    const { clientes } = get();
    const newCliente = { nombre, email, telefono };
    const updatedClientes = [...clientes, newCliente];
    set({ clientes: updatedClientes });
    localStorage.setItem("clientes", JSON.stringify(updatedClientes));
  },

  registerOrganizacion: (nombre, direccion, telefono) => {
    const { organizaciones } = get();
    const newOrganizacion = { nombre, direccion, telefono };
    const updatedOrganizaciones = [...organizaciones, newOrganizacion];
    set({ organizaciones: updatedOrganizaciones });
    localStorage.setItem("organizaciones", JSON.stringify(updatedOrganizaciones));
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
  },

  deleteUser: (username) => {
    const { users } = get();
    const updatedUsers = users.filter((u) => u.username !== username);
    set({ users: updatedUsers });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  },
  deleteCliente: (email) => {
    const { clientes } = get();
    const updatedClientes = clientes.filter((c) => c.email !== email);
    set({ clientes: updatedClientes });
    localStorage.setItem("clientes", JSON.stringify(updatedClientes));
  },
  deleteOrganizacion: (nombre) => {
    const { organizaciones } = get();
    const updatedOrganizaciones = organizaciones.filter((o) => o.nombre !== nombre);
    set({ organizaciones: updatedOrganizaciones });
    localStorage.setItem("organizaciones", JSON.stringify(updatedOrganizaciones));
  },
}));

export default useAuthStore;
