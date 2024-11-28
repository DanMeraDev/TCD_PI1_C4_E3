package dh.backend.mojarra_tours.service.impl;

import dh.backend.mojarra_tours.dto.ReservationDto;
import dh.backend.mojarra_tours.entity.Reservation;
import dh.backend.mojarra_tours.entity.Tour;
import dh.backend.mojarra_tours.entity.User;
import dh.backend.mojarra_tours.exception.ResourceNotFoundException;
import dh.backend.mojarra_tours.mapper.ReservationMapper;
import dh.backend.mojarra_tours.repository.ReservationRepository;
import dh.backend.mojarra_tours.repository.TourRepository;
import dh.backend.mojarra_tours.repository.UserRepository;
import dh.backend.mojarra_tours.service.IReservationService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements IReservationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ReservationServiceImpl.class);

    private ReservationRepository reservationRepository;
    private UserRepository userRepository;
    private TourRepository tourRepository;

    @Override
    public ReservationDto createReservation(ReservationDto reservationDto) {
        // Find user and tour from dto
        LocalDate date = reservationDto.getDate();
        validateReservationDate(date);

        LOGGER.info("Creating reservation for: " + reservationDto);

        User user = userRepository.findById(reservationDto.getUserId())
                .orElseThrow(()->
                        new ResourceNotFoundException("User not found with id "+ reservationDto.getUserId()));
        Tour tour = tourRepository.findById(reservationDto.getTourId())
                .orElseThrow(()->
                        new ResourceNotFoundException("Tour not found with id "+ reservationDto.getTourId()));

        Reservation reservation = ReservationMapper.mapToReservation(reservationDto, tour, user);
        Reservation savedReservation = reservationRepository.save(reservation);
        LOGGER.info("Saved Reservation " + savedReservation);
        return ReservationMapper.mapToReservationDto(savedReservation);

    }

    @Override
    public ReservationDto editReservation(Long id, ReservationDto reservationDto) {
        return null;
    }

    @Override
    public ReservationDto getReservationById(Long id) {
        return null;
    }

    @Override
    public List<ReservationDto> getReservations() {
        return null;
    }

    @Override
    public void deleteReservation(Long id) {

    }

    private void validateReservationDate(LocalDate date) {
        if (date.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Date must be in the present or future");
        }
    }
}
