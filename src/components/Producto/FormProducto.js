import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./formproducto.scss";
import { Link } from "react-router-dom";
import {
  deleteFile,
  recuperarUrlImagen,
  subirImagen,
} from "../../firebase/config";
import { Icon } from "@iconify/react";

const FormProducto = () => {
  const [categorias, setCategorias] = useState([]);
  const navegar = useNavigate();
  const [precioInicial, setPrecioInicial] = useState(0);
  const [margen, setMargen] = useState(0);
  const [precioTotal, setPrecioTotal] = useState("");

  const schema = yup.object({
    id_categoria: yup.string().required("El campo categoría es requerido"),
    nombre_producto: yup.string().required("El campo nombre es requerido"),
    precio_inicial_producto: yup
      .number()
      .required("El campo precio inicial es requerido"),
    margen_producto: yup.number().required("El campo margen es requerido"),
    precio_total_producto: yup.string(),
    tamanio_producto: yup.string().required("El campo tamanio es requerido"),
    imagen_producto: yup.string(),
    descripcion_categoria: yup.string(),
    stok_actual_producto: yup
      .string()
      .required("El campo de stock actual es requerido"),
    stok_min_producto: yup
      .string()
      .required("El campo de stock minimo es requerido"),
  });

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });



  useEffect(() => {
    if (!isNaN(precioInicial) && !isNaN(margen)) {
      setPrecioTotal(precioInicial + (precioInicial * margen) / 100);
    } else {
      setPrecioTotal(""); // Si el valor no es un número válido, establece una cadena vacía
    }

    const precioTotalCalculado =
      parseFloat(precioInicial) +
      (parseFloat(precioInicial) * parseFloat(margen)) / 100;

    console.log("Precio Inicial:", precioInicial);
    console.log("Margen:", margen);
    console.log("Precio Total Calculado:", precioTotalCalculado);

    axios
      .get("https://viverobackend-production.up.railway.app/api/categorias")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar las categorías:", error);
      });
  }, [margen, precioInicial, precioTotal]);

  const onSubmit = async (data) => {
    try {
      const producto = {
        ...data,
        precio_inicial_producto: precioInicial,
        margen_producto: margen,
        precio_total_producto: precioTotal,
      };

      const imagen_archivo = document.getElementById("imagen_producto").files;

      const maxSize = 5 * 1024 * 1024; // 5 MB en bytes
      if (imagen_archivo[0].size > maxSize) {
        alert(`Tamaño máximo de 5 MB excedido`);
        return;
      }

      if (
        producto.nombre_producto &&
        producto.id_categoria &&
        producto.precio_inicial_producto &&
        producto.precio_total_producto &&
        producto.margen_producto &&
        producto.tamanio_producto &&
        producto.stok_actual_producto &&
        producto.stok_min_producto
      ) {
        const resultado = await subirFirebase(imagen_archivo[0]);
        console.log("Resultado subida:", resultado);

        producto.imagen_producto = resultado.url;

        const response = await axios.post(
          "https://viverobackend-production.up.railway.app/api/productos",
          producto
        );

        if (response.status === 201) {
          console.log("Producto creado con éxito");
          navegar("/inventario/producto");
        } else {
          console.error(
            "Error al crear el producto. Respuesta inesperada:",
            response
          );
        }
      } else {
        alert("Llene todos los campos obligatorios");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const subirFirebase = async (archivo) => {
    try {
      const portadaInfo = await subirImagen(archivo);
      const imageUrl = await recuperarUrlImagen(portadaInfo);
      return { url: imageUrl, filePath: portadaInfo };
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container form-producto">
      <div className="row form-p">
        <div className=" col-md-6 mx-auto px-5 border-form p-2 ">
          <h3 className="text-center">Registrar producto</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-1">
              <div className="col-md-6">
                <label className="form-label">Nombre de producto</label>
                <input
                  type="text"
                  placeholder="Ingrese nombre de producto"
                  className={`form-control ${
                    errors.nombre_producto ? "is-invalid" : ""
                  }`}
                  {...register("nombre_producto")}
                />
                {errors.nombre_producto && (
                  <span className="badge text-bg-danger">
                    {errors.nombre_producto.message}
                  </span>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">Categoria*</label>
                <select
                  className={`form-control ${
                    errors.id_categoria ? "is-invalid" : ""
                  }`}
                  {...register("id_categoria")}
                >
                  <option value="">Seleccionar</option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.id_categoria}
                      value={categoria.id_categoria}
                    >
                      {categoria.nombre_categoria}
                    </option>
                  ))}
                </select>
                {errors.id_categoria && (
                  <span className="badge text-bg-danger">
                    {errors.id_categoria.message}
                  </span>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">Precio inicial*</label>
                <input
                  type="number"
                  placeholder="Ingrese precio inicial"
                  className={`form-control ${
                    errors.precio_inicial_producto ? "is-invalid" : ""
                  }`}
                  {...register("precio_inicial_producto")}
                  onChange={(e) => setPrecioInicial(parseFloat(e.target.value))}
                  value={precioInicial}
                />
                {errors.precio_inicial_producto && (
                  <span className="badge text-bg-danger">
                    {errors.precio_inicial_producto.message}
                  </span>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">Margen %*</label>
                <input
                  type="number"
                  placeholder="Ingrese margen"
                  className={`form-control ${
                    errors.margen_producto ? "is-invalid" : ""
                  }`}
                  {...register("margen_producto")}
                  onChange={(e) => setMargen(parseFloat(e.target.value))}
                  value={margen}
                />
                {errors.margen_producto && (
                  <span className="badge text-bg-danger">
                    {errors.margen_producto.message}
                  </span>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">Precio total*</label>
                <input
                  type="number"
                  name="precio_total_producto"
                  className={`form-control ${
                    errors.precio_total_producto ? "is-invalid" : ""
                  }`}
                  {...register("precio_total_producto")}
                  value={precioTotal}
                />
                {errors.precio_total_producto && (
                  <span className="badge text-bg-danger">
                    {errors.precio_total_producto.message}
                  </span>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">Tamaño*</label>
                <select
                  className={`form-control ${
                    errors.tamanio_producto ? "is-invalid" : ""
                  }`}
                  {...register("tamanio_producto")}
                >
                  <option value="">Seleccionar</option>
                  <option value="Pequeño">Pequeño</option>
                  <option value="Mediano">Mediano</option>
                  <option value="Grande">Grande</option>
                </select>
                {errors.tamanio_producto && (
                  <span className="badge text-bg-danger">
                    {errors.tamanio_producto.message}
                  </span>
                )}
              </div>
              
              <div className="col-md-6">
                <label className="form-label">Imagen(opcional)</label>
                <input
                  type="file"
                  id="imagen_producto"
                  placeholder="Ingrese nombre de producto"
                  className={`form-control ${
                    errors.imagen_producto ? "is-invalid" : ""
                  }`}
                  {...register("imagen_producto")}
                />
                {errors.imagen_producto && (
                  <span className="badge text-bg-danger">
                    {errors.imagen_producto.message}
                  </span>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">Descripción (opcional)</label>
                <textarea
                  className="form-control"
                  type="text"
                  placeholder="Ingrese descripci&oacute;n"
                  rows="3"
                  {...register("descripcion_producto")}
                ></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label">Stock actual*</label>
                <input
                  type="number"
                  name="stok_actual_producto"
                  placeholder="Ingrese stock actual"
                  className={`form-control ${
                    errors.stok_actual_producto ? "is-invalid" : ""
                  }`}
                  {...register("stok_actual_producto")}
                />

                {errors.stok_actual_producto && (
                  <span className="badge text-bg-danger">
                    {errors.stok_actual_producto.message}
                  </span>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">Stock minimo*</label>
                <input
                  type="number"
                  name="stok_min_producto"
                  placeholder="Ingrese stock mínimo"
                  className={`form-control ${
                    errors.stok_min_producto ? "is-invalid" : ""
                  }`}
                  {...register("stok_min_producto")}
                />
                {errors.stok_min_producto && (
                  <span className="badge text-bg-danger">
                    {errors.stok_min_producto.message}
                  </span>
                )}
              </div>
              <div className="col-12 botones-Categoria">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormProducto;
