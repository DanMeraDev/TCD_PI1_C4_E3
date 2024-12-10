package dh.backend.mojarra_tours.repository;

import dh.backend.mojarra_tours.entity.Favorite;
import dh.backend.mojarra_tours.entity.User;
import dh.backend.mojarra_tours.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    // Buscar un favorito por usuario y tour
    Optional<Favorite> findByUserIdAndTourId(Long userId, Long tourId);

    // Verificar si un favorito ya existe para evitar duplicados
    boolean existsByUserAndTour(User user, Tour tour);

    // Verificar si un favorito ya existe por usuario y tour específicos
    boolean existsByUserIdAndTourId(Long userId, Long tourId);

    // Obtener favoritos por el ID del usuario
    List<Favorite> findByUserId(Long userId);

    // Eliminar favoritos por usuario y tour
    void deleteByUserIdAndTourId(Long userId, Long tourId);
}
