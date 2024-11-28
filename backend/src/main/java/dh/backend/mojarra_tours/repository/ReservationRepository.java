package dh.backend.mojarra_tours.repository;

import dh.backend.mojarra_tours.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
