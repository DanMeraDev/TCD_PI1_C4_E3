import React, { useState } from 'react';
import axios from 'axios';
import './ProfileImageUpload.css'; // Archivo CSS actualizado

const ProfileImageUpload = ({ userId, setUserData }) => {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageUpload = (e) => {
        const imgFile = e.target.files[0];
        if (!imgFile) return;

        setImage(imgFile);
        const previewUrl = URL.createObjectURL(imgFile);
        setPreviewImage(previewUrl);
    };

    const handleImageSubmit = async () => {
        if (image) {
            const formData = new FormData();
            formData.append("image", image);

            try {
                const token = sessionStorage.getItem("token");
                const response = await axios.post(`https://ramoja-tours.up.railway.app/api/user/${userId}/profile-image`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setUserData((prevData) => ({ ...prevData, image: response.data.image }));
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
