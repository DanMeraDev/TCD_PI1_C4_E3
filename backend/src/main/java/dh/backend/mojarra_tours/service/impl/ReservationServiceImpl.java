package dh.backend.mojarra_tours.service.impl;
import dh.backend.mojarra_tours.dto.ReservationDto;
import dh.backend.mojarra_tours.entity.Reservation;
import dh.backend.mojarra_tours.entity.Tour;
import dh.backend.mojarra_tours.entity.User;
import dh.backend.mojarra_tours.enums.EmailType;
import dh.backend.mojarra_tours.exception.ResourceNotFoundException;
import dh.backend.mojarra_tours.mapper.ReservationMapper;
import dh.backend.mojarra_tours.repository.ReservationRepository;
import dh.backend.mojarra_tours.repository.TourRepository;
import dh.backend.mojarra_tours.repository.UserRepository;
import dh.backend.mojarra_tours.service.IMailService;
import dh.backend.mojarra_tours.service.IReservationService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements IReservationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ReservationServiceImpl.class);

    private ReservationRepository reservationRepository;
    private UserRepository userRepository;
    private TourRepository tourRepository;
    private IMailService mailService;

    @Override
    public ReservationDto createReservation(ReservationDto reservationDto) {
        // Find user and tour from dto
        LocalDate date = reservationDto.getDate();
        Long tourId = reservationDto.getTourId();
        validateReservationDate(tourId, date); // checks if date is present or future, and if it has already been booked for a given tour.

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
        LOGGER.info("Sending confirmation of reservation email to "+user.getEmail());
        mailService.sendEmail(EmailType.RESERVATION_CONFIRMATION, savedReservation);
        return ReservationMapper.mapToReservationDto(savedReservation);
    }

    @Override
    public ReservationDto editReservation(Long id, ReservationDto reservationDto) {
        return null;
    }

    @Override
    public List<ReservationDto> getReservationByTourId(Long tourId) {
        LOGGER.info("Searching for Reservations for Tour with id "+tourId);
        List<Reservation> reservations = reservationRepository.findByTourId(tourId);
        if (reservations.isEmpty()) {
            LOGGER.warn("No reservations found for Tour with id " + tourId);
            throw new ResourceNotFoundException("No reservations found for Tour with id: " + tourId);
        }
        List<ReservationDto> reservationDtoResponse = new ArrayList<>();
        for (Reservation reservation: reservations) {
            reservationDtoResponse.add(ReservationMapper.mapToReservationDto(reservation));
        }
        return reservationDtoResponse;
    }

    @Override
    public List<ReservationDto> getReservationByUserId(Long userId) {
        LOGGER.info("Searching for Reservations from User with id "+userId);
        List<Reservation> reservations = reservationRepository.findByUserId(userId);
        if (reservations.isEmpty()) {
            LOGGER.warn("No reservations found from User with id " + userId);
            throw new ResourceNotFoundException("No reservations found from User with id: " + userId);
        }
        List<ReservationDto> reservationDtoResponse = new ArrayList<>();
        for (Reservation reservation: reservations) {
            reservationDtoResponse.add(ReservationMapper.mapToReservationDto(reservation));
        }
        return reservationDtoResponse;
    }

    @Override
    public List<ReservationDto> getReservations() {
        LOGGER.info("Getting Reservations");
        List<Reservation> reservations = reservationRepository.findAll();
        List<ReservationDto> reservationDtoResponse = new ArrayList<>();
        for (Reservation reservation: reservations) {
            reservationDtoResponse.add(ReservationMapper.mapToReservationDto(reservation));
        }
        return reservationDtoResponse;
    }

    @Override
    public void deleteReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(()->
                        new ResourceNotFoundException("No reservation found with the given id: " + id));
        // Si no se arroja ningún error, entonces quiere decir que el tour existe, se procede a eliminarlo.
        reservationRepository.delete(reservation);
        LOGGER.info("Reservation With id " + id + " deleted");    }

    private void validateReservationDate(Long tourId, LocalDate date) {
        if (date.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Date must be in the present or future");
        }

        // Check if a reservation already exists for the same tour and date
        Optional<Reservation> existingReservation = reservationRepository.findByTourIdAndDate(tourId, date);
        if (existingReservation.isPresent()) {
            throw new IllegalStateException("Date is already reserved for this tour");
        }
    }
}
