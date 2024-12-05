package dh.backend.mojarra_tours.controller;
import dh.backend.mojarra_tours.dto.ReservationDto;
import dh.backend.mojarra_tours.exception.ResourceNotFoundException;
import dh.backend.mojarra_tours.service.IReservationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            // e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ReservationDto>> getReservations(){
        LOGGER.info("GET REQUEST ALL RESERVATIONS");
        try{
            List<ReservationDto> response = reservationService.getReservations();
            return ResponseEntity.ok(response);
        }catch(Exception e){
            LOGGER.error("Error getting reservations: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/tours/{id}")
    public ResponseEntity<List<ReservationDto>> getReservationsByTour(@PathVariable Long id){
        LOGGER.info("GET REQUEST RESERVATIONS BY TOUR ID");
        try{
            List<ReservationDto> response = reservationService.getReservationByTourId(id);
            return ResponseEntity.ok(response);
        }catch (ResourceNotFoundException e){
            LOGGER.error("Error Getting Reservations: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e){
            LOGGER.error("Error getting reservations: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<ReservationDto>> getReservationsByUser(@PathVariable Long id){
        LOGGER.info("GET REQUEST RESERVATIONS BY USER ID");
        try{
            List<ReservationDto> response = reservationService.getReservationByUserId(id);
            return ResponseEntity.ok(response);
        }catch (ResourceNotFoundException e){
            LOGGER.error("Error Getting Reservations: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e){
            LOGGER.error("Error getting reservations: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTourById(@PathVariable("id") Long id) {
        LOGGER.info("DELETE REQUEST: RESERVATION WITH ID " + id);
        try{
            reservationService.deleteReservation(id);
        }catch (ResourceNotFoundException e){
            LOGGER.error("Error deleting Reservation: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch(Exception e){
            LOGGER.error("Error deleting Reservation: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
