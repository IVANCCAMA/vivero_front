import React,{ useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import '../../App.css';
import './formcategoria.scss';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const FormCategoria = () => {
  const [cars, setCars] = useState([]);

  const schema = yup.object({
    nombre_categoria: yup.string().required('El campo categoría es requerido'),
    descripcion_categoria: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://viverobackend-production.up.railway.app/api/categorias', data);

      if (response.status === 201) {
        console.log("Categoría creada con éxito");
        window.close();
      } else {
        console.error("Error al crear la categoría. Respuesta inesperada:", response);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  const handleCancelClick = () => {
    window.history.back();
  };

  return (
    <div className="container formulario">
      <div className="row px-md-2">
        <div className=" mx-auto  p-md-5 border-form">
          <h3 className="text-center">Registrar categoría</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3">
              <label className="form-label">Nombre de categoría</label>
              <input type="text" placeholder="Ingrese nombre de categoria" className={`form-control ${errors.nombre_categoria ? 'is-invalid' : ''}`} {...register('nombre_categoria')} />
              {errors.nombre_categoria && <span className="badge text-bg-danger">{errors.nombre_categoria.message}</span>}
            </div>
            <div className="my-3">
              <label className="form-label">Descripción (opcional)</label>
              <textarea class="form-control" type="text" placeholder="Ingrese descripci&oacute;n" rows="3" {...register('descripcion_categoria')} ></textarea>
            </div>
            <div className="botones-Categoria">
              <button type="submit" className="bontosave btn btn-primary mb-2">
              <Icon icon="material-symbols-light:save-as" className="Icon" width="25" height="25" />
                Guardar
              </button>
              <button type="button" className="botoncancel btn btn-secondary mb-2 ms-2" onClick={handleCancelClick}>
              <Icon icon="mdi:cancel-box-multiple" className="Icon" width="25" height="25" />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCategoria;
