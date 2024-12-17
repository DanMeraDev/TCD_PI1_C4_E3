package dh.backend.mojarra_tours.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoriteRequestDTO {
    private Long userId;
    private Long tourId;
}
