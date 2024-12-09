import React, { useState, useEffect } from "react";
import "./AddCategoryForm.css";
import { isTokenExpired, isUserAdmin } from "../../../utils/functions/jwt";

const AddCategoryForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const BASE_URL = "https://ramoja-tours.up.railway.app";

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);


  // Manejar la carga de imágenes
  const handleImageUpload = (e) => {
    const imgFile = e.target.files[0]; // Only one file is allowed
    if (!imgFile) return;

    setImage(imgFile); // Save the file
    const previewUrl = URL.createObjectURL(imgFile); // Generate preview URL
    setPreviewImage(previewUrl); // Save the preview URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !image) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const formData = new FormData();

    const category = {
      name: name
    };

    formData.append("category", JSON.stringify(category));

    formData.append("image", image);


    try {
      const token = sessionStorage.getItem("token");
      if (isTokenExpired(token) || !isUserAdmin(token)) {
        console.log("Invalid or non admin token")
        throw new Error("Su token ha expirado o no cuenta con permisos de administrador.");
      }
      const response = await fetch(`${BASE_URL}/api/categories`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Añadir el token en el encabezado
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Error al agregar la categoría.");
      } else {
        setSuccess("categoría agregado correctamente.");
        // Limpiar el formulario
        setName("");
        setImage(null);
      }
    } catch (error) {
      setError("Hubo un problema al agregar la categoría.");
    }
  };

  return (
    <div className="add-category-form">
      <h2>Agregar Categoría</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="column1">
            <div className="form-group">
              <label htmlFor="nombre">Nombre de la Categoría</label>
              <input
                type="text"
                id="nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="column2">
            <div className="form-group">
              <label htmlFor="imagenes">Imagen</label>
              <input
                type="file"
                id="imagenes"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            {previewImage && (
              <div className="form-group">
                <label>Previsualización de imagen:</label>
                <div className="image-preview-container">
                  {
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="image-preview"
                    />
                  }
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="submit-button">Guardar Categoría</button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
