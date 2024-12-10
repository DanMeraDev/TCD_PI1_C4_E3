package dh.backend.mojarra_tours.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoriteResponseDTO {
    private Long id;
    private Long userId;
    private Long tourId;

    // Puedes incluir más detalles si es necesario, como el nombre del usuario o el nombre del tour.
}
