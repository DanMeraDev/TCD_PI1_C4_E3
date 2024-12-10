package dh.backend.mojarra_tours.service.impl;

import dh.backend.mojarra_tours.dto.FavoriteResponseDTO;
import dh.backend.mojarra_tours.entity.Favorite;
import dh.backend.mojarra_tours.entity.User;
import dh.backend.mojarra_tours.entity.Tour;
import dh.backend.mojarra_tours.mapper.FavoriteMapper;
import dh.backend.mojarra_tours.repository.FavoriteRepository;
import dh.backend.mojarra_tours.repository.UserRepository;
import dh.backend.mojarra_tours.repository.TourRepository;
import dh.backend.mojarra_tours.service.IFavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteServiceImpl implements IFavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TourRepository tourRepository;

    @Override
    public FavoriteResponseDTO addFavorite(Long userId, Long tourId) {
        // Obtener el usuario y el tour desde la base de datos
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour not found"));

        // Verificar si ya existe el favorito
        if (favoriteRepository.existsByUserAndTour(user, tour)) {
            throw new RuntimeException("Favorite already exists");
        }

        // Crear la entidad Favorite
        Favorite favorite = new Favorite(user, tour);

        // Guardar el favorito en la base de datos
        Favorite savedFavorite = favoriteRepository.save(favorite);

        // Convertir la entidad a DTO de respuesta y devolverlo
        return FavoriteMapper.toResponseDTO(savedFavorite);
    }

    @Override
    public void removeFavorite(Long userId, Long tourId) {
        // Buscar el favorito por el ID de usuario y tour
        Favorite favorite = favoriteRepository.findByUserIdAndTourId(userId, tourId)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));

        // Eliminar el favorito de la base de datos
        favoriteRepository.delete(favorite);
    }

    @Override
    public List<FavoriteResponseDTO> getFavoritesByUser(Long userId) {
        List<Favorite> favorites = favoriteRepository.findByUserId(userId);
        return FavoriteMapper.toResponseDTOList(favorites);
    }

    @Override
    public boolean isFavorite(Long userId, Long tourId) {
        return favoriteRepository.existsByUserIdAndTourId(userId, tourId);
    }
}
