import "../../App.scss";
import "./formcategoria.scss";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
const FormCategoria = () => {

  const schema = yup.object({
    nombre_categoria: yup.string().required("El campo categoría es requerido"),
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
      const response = await axios.post(
        "https://viverobackend-production.up.railway.app/api/categorias",
        data
      );

      if (response.status === 201) {
        console.log("Categoría creada con éxito");
        window.close();
      } else {
        console.error(
          "Error al crear la categoría. Respuesta inesperada:",
          response
        );
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="container formulario">
      <div className="row px-2">
        <div className=" col-md-6 mx-auto  p-5 border-form">
          <h3 className="text-center">Registrar categoría</h3>
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
                placeholder="Ingrese descripci&oacute;n"
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
                <Link
                  to="/inventario/categoria"
                  className="btn btn-danger ms-2"
                >
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

export default FormCategoria;
