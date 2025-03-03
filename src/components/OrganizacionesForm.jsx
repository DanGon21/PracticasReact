import React from 'react';
import { useForm } from 'react-hook-form';
import useAuthStore from "../features/auth/authStore";
import '../styles/formstyles.css';

function OrganizacionesForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { organizaciones, registerOrganizacion } = useAuthStore();

  const onSubmit = (data) => {
    if (organizaciones.some(org => org.nombre === data.nombre)) {
      alert('La organización ya está registrada.');
      return;
    }
    registerOrganizacion(data.nombre, data.direccion, data.telefono);
    alert('Organización registrada con éxito.');
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Registrar Organización</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Nombre de la Organización"
              className="outlined-input"
              {...register('nombre', { required: 'El nombre es obligatorio' })}
            />
            {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Dirección"
              className="outlined-input"
              {...register('direccion', { required: 'La dirección es obligatoria' })}
            />
            {errors.direccion && <p className="error-message">{errors.direccion.message}</p>}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Teléfono"
              className="outlined-input"
              {...register('telefono', { required: 'El teléfono es obligatorio' })}
            />
            {errors.telefono && <p className="error-message">{errors.telefono.message}</p>}
          </div>
          <div className="button-group">
            <button type="submit">Registrar Organización</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrganizacionesForm;
