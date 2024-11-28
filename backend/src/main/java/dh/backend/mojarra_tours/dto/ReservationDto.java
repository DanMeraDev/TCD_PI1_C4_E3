package dh.backend.mojarra_tours.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import dh.backend.mojarra_tours.enums.Diet;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReservationDto {

    private Long id;
    private Long userId;
    private Long tourId;
    private Diet diet;
    private Boolean includeLunch;
    private Boolean includeEquipment;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private Double totalCost;

}
