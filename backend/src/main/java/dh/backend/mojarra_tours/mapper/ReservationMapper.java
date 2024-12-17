package dh.backend.mojarra_tours.mapper;

import dh.backend.mojarra_tours.dto.ReservationDto;
import dh.backend.mojarra_tours.entity.Reservation;
import dh.backend.mojarra_tours.entity.Tour;
import dh.backend.mojarra_tours.entity.User;

public class ReservationMapper {

    public static ReservationDto mapToReservationDto(Reservation reservation){
        return new ReservationDto(
                reservation.getId(),
                reservation.getUser().getId(),
                reservation.getTour().getId(),
                reservation.getDiet(),
                reservation.getIncludeLunch(),
                reservation.getIncludeEquipment(),
                reservation.getDate(),
                reservation.getTotalCost()
        );
    }

    public static Reservation mapToReservation(ReservationDto reservationDto, Tour tour, User user){
        return new Reservation(
                reservationDto.getId(),
                user, // Sets the full User entity here
                tour, // Sets the full Tour entity here
                reservationDto.getDiet(),
                reservationDto.getIncludeLunch(),
                reservationDto.getIncludeEquipment(),
                reservationDto.getDate(),
                reservationDto.getTotalCost()
        );
    }
}
