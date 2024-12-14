import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileImageUpload.css'; // Archivo CSS para estilizar el componente

const ProfileImageUpload = ({ userId, setUserData }) => {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // Cargar la imagen de perfil al iniciar la sesión
    useEffect(() => {
        const savedImageUrl = sessionStorage.getItem("userImageUrl");
        if (savedImageUrl) {
            setUserData((prevData) => ({ ...prevData, image: savedImageUrl }));
        }
    }, [setUserData]);

    // Manejar la carga de la imagen
    const handleImageUpload = (e) => {
        const imgFile = e.target.files[0];
        if (!imgFile) return;

        setImage(imgFile);
        const previewUrl = URL.createObjectURL(imgFile);
        setPreviewImage(previewUrl);
    };

    // Manejar la actualización de la imagen de perfil
    const handleImageSubmit = async () => {
        if (image) {
            const formData = new FormData();
            formData.append("image", image);

            try {
                const token = sessionStorage.getItem("token");
                const response = await axios.put(`https://ramoja-tours.up.railway.app/api/user/${userId}/profile-image`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    // Guardar la URL de la imagen en sessionStorage para persistencia
                    sessionStorage.setItem("userImageUrl", response.data.image);

                    // Actualizar el estado con la nueva URL de la imagen
                    setUserData((prevData) => ({ ...prevData, image: response.data.image }));

                    // Limpiar la vista previa y notificar al usuario
                    setPreviewImage(null);
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
                {previewImage ? (
                    <img src={previewImage} alt="Vista previa" className="profile-image" />
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
