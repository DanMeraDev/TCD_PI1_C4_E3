package dh.backend.mojarra_tours.mapper;

import dh.backend.mojarra_tours.dto.FavoriteRequestDTO;
import dh.backend.mojarra_tours.dto.FavoriteResponseDTO;
import dh.backend.mojarra_tours.entity.Favorite;
import dh.backend.mojarra_tours.entity.User;
import dh.backend.mojarra_tours.entity.Tour;

import java.util.List;
import java.util.stream.Collectors;

public class FavoriteMapper {

    // Convertir de DTO a entidad
    public static Favorite toEntity(FavoriteRequestDTO dto, User user, Tour tour) {
        return new Favorite(user, tour);
    }

    // Convertir de entidad a DTO de respuesta
    public static FavoriteResponseDTO toResponseDTO(Favorite favorite) {
        FavoriteResponseDTO dto = new FavoriteResponseDTO();
        dto.setId(favorite.getId());
        dto.setUserId(favorite.getUser().getId());
        dto.setTourId(favorite.getTour().getId());
        return dto;
    }

    // Convertir lista de entidades a lista de DTOs
    public static List<FavoriteResponseDTO> toResponseDTOList(List<Favorite> favorites) {
        return favorites.stream()
                .map(FavoriteMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}
