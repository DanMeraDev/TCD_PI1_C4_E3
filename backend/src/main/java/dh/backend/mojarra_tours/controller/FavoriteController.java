package dh.backend.mojarra_tours.controller;

import dh.backend.mojarra_tours.dto.FavoriteResponseDTO;
import dh.backend.mojarra_tours.service.IFavoriteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/favorites")
@Tag(name = "Favoritos", description = "Endpoints para agregar y quitar favoritos")
public class FavoriteController {

    @Autowired
    private IFavoriteService favoriteService;

    // Endpoint para agregar un favorito
    @PostMapping("/{userId}/{tourId}")
    public ResponseEntity<String> addFavorite(@PathVariable Long userId, @PathVariable Long tourId) {
        try {
            // Intentar agregar el favorito
            FavoriteResponseDTO favorite = favoriteService.addFavorite(userId, tourId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Favorito agregado correctamente.");
        } catch (IllegalArgumentException e) {
            // Si el favorito ya existe, devolver un mensaje de error
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Este tour ya ha sido agregado a favoritos.");
        }
    }

    // Endpoint para eliminar un favorito
    @DeleteMapping("/{userId}/{tourId}")
    public ResponseEntity<String> removeFavorite(@PathVariable Long userId, @PathVariable Long tourId) {
        favoriteService.removeFavorite(userId, tourId);
        return ResponseEntity.status(HttpStatus.OK).body("Favorito eliminado correctamente.");
    }

    // Endpoint para obtener todos los favoritos de un usuario
    @GetMapping("/user/{userId}")
    public List<FavoriteResponseDTO> getUserFavorites(@PathVariable Long userId) {
        return favoriteService.getFavoritesByUser(userId);
    }

    // Endpoint para verificar si un tour es favorito de un usuario
    @GetMapping("/check/{userId}/{tourId}")
    public boolean isFavorite(@PathVariable Long userId, @PathVariable Long tourId) {
        return favoriteService.isFavorite(userId, tourId);
    }
}
