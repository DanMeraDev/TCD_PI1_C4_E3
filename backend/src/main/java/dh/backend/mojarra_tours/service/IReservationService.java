package dh.backend.mojarra_tours.service;

import dh.backend.mojarra_tours.dto.ReservationDto;

import java.util.List;

public interface IReservationService {
    ReservationDto createReservation(ReservationDto reservationDto);

    ReservationDto editReservation(Long id, ReservationDto reservationDto);

    List<ReservationDto> getReservationByTourId(Long id);

    List<ReservationDto> getReservations();

    void deleteReservation(Long id);



}
