import React, { useState, useEffect } from "react";
import "./AddTourForm.css";

const niveles = [
  "NOVICE",
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "EXPERT",
  "SUPER_EXPERT",
  "ELITE",
  "SUPER_ELITE",
  "ALIENS",
];

const destinos = [
  { value: "LA_MOJARRA", label: "La Mojarra" },
  { value: "MOJARRA_SALVAJE", label: "Mojarra Salvaje" },
  { value: "MACAGUATO", label: "Macaguato" },
  { value: "LA_PENIA", label: "La Peña" },
  { value: "CHICAMOCHA", label: "Cañón del Chicamocha" },
  { value: "BARICHARA", label: "Barichara" },
  { value: "MESA_DE_LOS_SANTOS", label: "Mesa de los Santos" },
];


const dias = [
  { value: "MON", label: "Monday" },
  { value: "TUE", label: "Tuesday" },
  { value: "WED", label: "Wednesday" },
  { value: "THU", label: "Thursday" },
  { value: "FRI", label: "Friday" },
  { value: "SAT", label: "Saturday" },
  { value: "SUN", label: "Sunday" },
];

const AddTourForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [nivel, setNivel] = useState("");
  const [destino, setDestino] = useState("");
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);


  const BASE_URL = "https://ramoja-tours.up.railway.app";

  useEffect(() => {
    const fetchCategorias = async () => {
      setIsCategoriesLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/categories`);
        const result = await response.json();
        console.log(result)
        setCategorias(result);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        setCategorias([]);
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  // Manejar la carga de imágenes
  const handleImageUpload = (e) => {
    setImagenes([...e.target.files]);
  };


  const renderOptions = (options, valueField = "value", labelField = "label") => {
    return options.map((option, index) => (
      <option
        key={index}
        value={typeof option === "object" ? option[valueField] : option}
      >
        {typeof option === "object" ? option[labelField] : option}
      </option>
    ));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nombre || !descripcion || !categoria || !nivel || !destino || !dia || !hora || imagenes.length === 0) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const formData = new FormData();
        
    const tour = {
      name: nombre,
      description: descripcion,
      category: categoria,
      level: nivel,
      destination: destino,
      day: dia,
      schedule: hora,
    };

    formData.append("tour", JSON.stringify(tour));

    imagenes.forEach((imagen) => {
      formData.append("images", imagen);
    });

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/tours`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Añadir el token en el encabezado
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Error al agregar el producto.");
      } else {
        setSuccess("Producto agregado correctamente.");
        // Limpiar el formulario
        setNombre("");
        setDescripcion("");
        setCategoria("");
        setNivel("");
        setDestino("");
        setDia("");
        setHora("");
        setImagenes([]);
      }
    } catch (error) {
      setError("Hubo un problema al agregar el producto.");
    }
  };

  return (
    <div className="add-tour-form">
      <h2>Agregar Producto</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre del producto</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Seleccione una categoría</option>
              {isCategoriesLoading ? (
                <option>Cargando...</option>
              ) : (
                renderOptions(categorias, "id", "name")
              )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="nivel">Nivel</label>
            <select id="nivel" value={nivel} onChange={(e) => setNivel(e.target.value)}>
              <option value="">Seleccione un nivel</option>
              {renderOptions(niveles)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="destino">Destino</label>
            <select id="destino" value={destino} onChange={(e) => setDestino(e.target.value)}>
              <option value="">Seleccione un destino</option>
              {renderOptions(destinos)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dia">Día</label>
            <select id="dia" value={dia} onChange={(e) => setDia(e.target.value)}>
              <option value="">Seleccione un día</option>
              {renderOptions(dias)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="imagenes">Imágenes</label>
            <input
              type="file"
              id="imagenes"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hora">Hora del tour</label>
            <input
              type="time"
              id="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
            <p>{hora}</p>
          </div>
          <button type="submit" className="submit-button">Guardar Producto</button>
        </div>
      </form>
    </div>
  );
};

export default AddTourForm;
