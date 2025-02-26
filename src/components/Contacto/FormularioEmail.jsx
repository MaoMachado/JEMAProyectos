import { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  width: 80%;
  font-family: "Roboto_ligth";

  .container {
    display: flex;
    gap: 7px;
    flex-direction: column;

    label {
      font-family: "Roboto";
      font-size: 1.5em;
    }

    input,
    textarea {
      padding: 10px;
      background: var(--blanco);
      border-radius: 15px;
      border: 0;
      outline: 2px solid var(--azulTransparente);
      font-size: 1.3em;
      font-family: "Roboto";
    }

    textarea {
      height: 100px;
      font-family: "Roboto";
      font-size: 1.3em;

      &:focus {
        outline: 2px solid var(--azul);
      }
    }

    input:focus {
      border: none;
      outline: 2px solid var(--azul);
      border-bottom: 0;
    }
  }

  button {
    width: 50%;
    margin: 0 auto;
    padding: 10px 0;
    background: transparent;
    border: 2px solid var(--azul);
    border-radius: 15px;
    font-size: 1.5em;
    font-family: "Roboto";
    transition: background 0.1s linear;

    &:hover {
      background: var(--azul);
      color: #fff;
      font-weight: bold;
    }

    &:active {
      scale: 0.98;
      box-shadow: 0 0 10px hsla(0, 0%, 0%, 0.2);
    }
  }
`;

const Popover = styled.div`
  position: fixed;
  top: 50px;
  right: 50%;
  transform: translateX(50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

export const FormularioEmail = () => {
  //Estado para manejar los valores del input
  const [formData, setFormData] = useState({
    correo: "",
    asunto: "",
    mensaje: "",
  });

  const [error, setError] = useState(null);

  //Estado para controlar la visibilidad del popover
  const [showPopover, setShowPopover] = useState(false);

  //Función  que se ejecuta cada vez que cambia el input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Función para manejar el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    //Remplazar valores con los de EmailJS
    const serviceID = "";
    const templateID = "";
    const userID = "";

    try {
      const response = await emailjs.send(serviceID, templateID, userID);

      //Mostrar el popover de exito
      setShowPopover(true);

      //Ocultar el popover despues de 5s
      setTimeout(() => {
        setShowPopover(false);
      }, 5000);

      //Limpiar el formulario
      setFormData({
        correo: "",
        asunto: "",
        mensaje: "",
      });
    } catch (err) {
      setError("No se pudo enviar el correo. Intentelo mas tarde", err);
    }
  };

  return (
    <>
      {showPopover && <Popover>Correo Enviado Exitosamente</Popover>}
      <FormContainer onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="correo">Correo...</label>
          <input
            type="email"
            name="correo"
            id="correo"
            placeholder="correo@correo.com"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="container">
          <label htmlFor="asunto">Asunto...</label>
          <input
            type="text"
            name="asunto"
            id="asunto"
            placeholder="Titulo del correo"
            value={formData.asunto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="container">
          <label htmlFor="mensaje">Mensaje...</label>
          <textarea
            name="mensaje"
            id="mensaje"
            placeholder="Danos tus detalles"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Enviar Correo</button>
      </FormContainer>
    </>
  );
};
