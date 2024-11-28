package dh.backend.mojarra_tours.service;

import dh.backend.mojarra_tours.dto.ReservationDto;
import dh.backend.mojarra_tours.dto.TourDto;

import java.util.List;

public interface IReservationService {
    ReservationDto createReservation(ReservationDto reservationDto);

    ReservationDto editReservation(Long id, ReservationDto reservationDto);

    ReservationDto getReservationById(Long id);

    List<ReservationDto> getReservations();

    void deleteReservation(Long id);

}
