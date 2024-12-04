package dh.backend.mojarra_tours.repository;

import dh.backend.mojarra_tours.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByTourId(Long tourId);

    List<Reservation> findByUserId(Long userId);


    Optional<Reservation> findByTourIdAndDate(Long tourId, LocalDate date);

}
