import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import "./formcategoria.scss";
import axios from "axios";
import { Icon } from "@iconify/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const FormEditarCategoria = () => {
  const { id_categoria } = useParams();

  const schema = yup.object({
    nombre_categoria: yup.string().required("El campo categoría es requerido"),
    descripcion_categoria: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const loadCategoria = async () => {
    try {
      const response = await axios.get(
        `https://viverobackend-production.up.railway.app/api/categorias/${id_categoria}`
      );

      if (response.status === 200) {
        setValue("nombre_categoria", response.data.nombre_categoria);
        setValue("descripcion_categoria", response.data.descripcion_categoria);
      }
    } catch (error) {
      console.error("Error al obtener la Categoría:", error);
    }
  };

  useEffect(() => {
    loadCategoria();
  }, [id_categoria, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `https://viverobackend-production.up.railway.app/api/categorias/${id_categoria}`,
        data
      );

      if (response.status === 200) {
        console.log("Categoría actualizada con éxito");
        // Puedes realizar otras acciones si es necesario
      } else {
        console.error(
          "Error al actualizar la categoría. Respuesta inesperada:",
          response
        );
        // Puedes mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Puedes mostrar un mensaje de error al usuario
    }
  };

  const handleCancelClick = () => {
    // Navega hacia atrás en la historia del navegador
    window.history.back();
  };


  return (
    <div className="container formulario">
      <div className="row px-2">
        <div className=" col-md-6 mx-auto  p-5 border-form">
          <h3 className="text-center">Editar categoría</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3">
              <label className="form-label">Nombre de categoría</label>
              <input
                type="text"
                placeholder="Ingrese nombre de categoria"
                className={`form-control ${
                  errors.nombre_categoria ? "is-invalid" : ""
                }`}
                {...register("nombre_categoria")}
              />
              {errors.nombre_categoria && (
                <span className="badge text-bg-danger">
                  {errors.nombre_categoria.message}
                </span>
              )}
            </div>
            <div className="my-3">
              <label className="form-label">Descripción (opcional)</label>
              <textarea
                className="form-control"
                type="text"
                rows="3"
                {...register("descripcion_categoria")}
              ></textarea>
            </div>
            <div className="botones-Categoria">
              <button type="submit" className="btn btn-primary ms-2">
                <Icon
                  icon="material-symbols-light:save-as"
                  className="Icon"
                  width="20"
                  height="20"
                />
                Guardar
              </button>
              <Link to="/inventario/categoria" className="btn btn-danger ms-2">
                <Icon
                  icon="mdi:cancel-box-multiple"
                  className="Icon"
                  width="20"
                  height="20"
                />
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEditarCategoria;
