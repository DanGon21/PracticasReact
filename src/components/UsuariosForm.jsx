import React from 'react';
import { useForm } from 'react-hook-form';
import useAuthStore from "../features/auth/authStore";
import '../styles/formstyles.css';

function UsuariosForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { users, register: registerUser } = useAuthStore();

  const onSubmit = (data) => {
    if (users.some(user => user.email === data.email)) {
      alert('El usuario ya está registrado.');
      return;
    }
    registerUser(data.nombre, data.email, data.rol, 'defaultPassword');
    alert('Usuario registrado con éxito.');
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Registrar Usuario</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Nombre"
              className="outlined-input"
              {...register('nombre', { required: 'El nombre es obligatorio' })}
            />
            {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="outlined-input"
              {...register('email', { required: 'El email es obligatorio' })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div>
            <select
              className="outlined-input"
              {...register('rol', { required: 'El rol es obligatorio' })}
            >
              <option value="">Selecciona un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Usuario">Usuario</option>
            </select>
            {errors.rol && <p className="error-message">{errors.rol.message}</p>}
          </div>
          <div className="button-group">
            <button type="submit">Registrar Usuario</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsuariosForm;
