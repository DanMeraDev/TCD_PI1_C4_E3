package dh.backend.mojarra_tours.service;

import dh.backend.mojarra_tours.dto.FavoriteResponseDTO;

import java.util.List;

public interface IFavoriteService {

    // Agregar un favorito
    FavoriteResponseDTO addFavorite(Long userId, Long tourId);

    // Eliminar un favorito
    void removeFavorite(Long userId, Long tourId);

    // Obtener todos los favoritos de un usuario
    List<FavoriteResponseDTO> getFavoritesByUser(Long userId);

    // Verificar si un tour es favorito de un usuario
    boolean isFavorite(Long userId, Long tourId);
}
