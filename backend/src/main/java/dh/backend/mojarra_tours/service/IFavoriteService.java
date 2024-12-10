package dh.backend.mojarra_tours.service;

import dh.backend.mojarra_tours.entity.Tour;
import dh.backend.mojarra_tours.entity.User;

public interface IFavoriteService {
    void addFavorite(Long userId, Long tourId);
    void removeFavorite(Long userId, Long tourId);
    boolean isFavorite(Long user, Long tour);
}
