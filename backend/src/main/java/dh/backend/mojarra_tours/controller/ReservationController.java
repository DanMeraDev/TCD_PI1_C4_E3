package dh.backend.mojarra_tours.controller;

import dh.backend.mojarra_tours.dto.ReservationDto;
import dh.backend.mojarra_tours.exception.ResourceNotFoundException;
import dh.backend.mojarra_tours.service.IReservationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/reservations")
@Tag(name = "Reservations", description = "Endpoints para gestionar reservas")
public class ReservationController {
    private IReservationService reservationService; // dependencia del servicio
    private static Logger LOGGER = LoggerFactory.getLogger(ReservationController.class);

    @PostMapping
    public ResponseEntity<ReservationDto> createReservation(@RequestBody ReservationDto reservationDto){
        try {
            ReservationDto savedReservation = reservationService.createReservation(reservationDto);
            LOGGER.info("POST REQUEST RESERVATION CREATED" +savedReservation);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedReservation);
        }catch (ResourceNotFoundException e) {
            LOGGER.error("Resource not found: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            LOGGER.error("Error creating reservation: " + e.getMessage());
//            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
