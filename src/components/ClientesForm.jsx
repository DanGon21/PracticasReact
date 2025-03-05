import { useForm } from 'react-hook-form';
import useAuthStore from "../features/auth/authStore";
import '../styles/formstyles.css';

function ClientesForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { clientes, registerCliente } = useAuthStore();

  const onSubmit = (data) => {
    if (clientes.some(cliente => cliente.email === data.email)) {
      alert('El cliente ya está registrado.');
      return;
    }
    registerCliente(data.nombre, data.email, data.telefono);
    alert('Cliente registrado con éxito.');
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Registrar Cliente</h2>
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
            <input
              type="tel"
              placeholder="Teléfono"
              className="outlined-input"
              {...register('telefono', { required: 'El teléfono es obligatorio' })}
            />
            {errors.telefono && <p className="error-message">{errors.telefono.message}</p>}
          </div>
          <div className="button-group">
            <button type="submit">Registrar Cliente</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientesForm;
