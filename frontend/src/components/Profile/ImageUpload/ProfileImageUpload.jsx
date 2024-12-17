import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileImageUpload.css'; // Archivo CSS para estilizar el componente

const ProfileImageUpload = ({ userId, setUserData }) => {
    const [image, setImage] = useState(null); // Para almacenar el archivo de imagen
    const [previewImage, setPreviewImage] = useState(null); // Para almacenar la URL de previsualización de la imagen

    // Cargar la imagen de perfil al iniciar la sesión (si existe)
    useEffect(() => {
        const savedImageUrl = sessionStorage.getItem("userImageUrl");
        if (savedImageUrl) {
            setPreviewImage(savedImageUrl); // Mostrar la imagen guardada al cargar
            setUserData((prevData) => ({ ...prevData, image: savedImageUrl }));
        }
    }, [setUserData]);

    // Manejar la carga de la imagen
    const handleImageUpload = (e) => {
        const imgFile = e.target.files[0];
        if (!imgFile) return;

        setImage(imgFile); // Almacenar el archivo de imagen
        const previewUrl = URL.createObjectURL(imgFile); // Crear una URL temporal para previsualizar la imagen
        setPreviewImage(previewUrl); // Asignar la URL de previsualización
    };

    // Manejar la actualización de la imagen de perfil
    const handleImageSubmit = async () => {
        if (image) {
            const formData = new FormData();
            formData.append("image", image);

            try {
                const token = sessionStorage.getItem("token");
                const response = await axios.put(
                    `https://ramoja-tours.up.railway.app/api/user/${userId}/profile-image`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    // Obtener la URL de la imagen persistida en el servidor (asumimos que el servidor responde con 'imageUrl')
                    const savedImageUrl = response.data.imageUrl;

                    // Actualizar la vista previa con la imagen persistida
                    setPreviewImage(savedImageUrl);

                    // Guardar la URL en sessionStorage para persistencia
                    sessionStorage.setItem("userImageUrl", savedImageUrl);

                    // Actualizar el estado global
                    setUserData((prevData) => ({ ...prevData, image: savedImageUrl }));

                    alert("Imagen actualizada exitosamente.");
                }
            } catch (error) {
                console.error("Error al cargar la imagen:", error);
                alert("Hubo un problema al actualizar la imagen.");
            }
        }
    };

    return (
        <div className="profile-image-upload">
            <div className="profile-image-container">
                {/* Mostrar la imagen previsualizada o el ícono de "+" si no hay imagen */}
                {previewImage ? (
                    <img src={previewImage}  className="profile-image" />
                ) : (
                    <div className="placeholder">+</div>
                )}
                <div className="edit-overlay">
                    <label className="edit-label">
                        Editar
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="upload-input"
                        />
                    </label>
                </div>
            </div>

            {/* Botón para subir la imagen */}
            <button onClick={handleImageSubmit} className="submit-button">
                Guardar Imagen
            </button>
        </div>
    );
};

export default ProfileImageUpload;
