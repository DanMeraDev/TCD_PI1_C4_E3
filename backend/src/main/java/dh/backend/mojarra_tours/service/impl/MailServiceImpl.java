package dh.backend.mojarra_tours.service.impl;

import dh.backend.mojarra_tours.entity.Reservation;
import dh.backend.mojarra_tours.entity.User;
import dh.backend.mojarra_tours.enums.EmailType;
import dh.backend.mojarra_tours.repository.UserRepository;
import dh.backend.mojarra_tours.service.IMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements IMailService {

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private UserRepository userRepository;


    @Override
    public void sendEmail(EmailType emailType, Object context) {
        switch (emailType){
            case RESERVATION_CONFIRMATION -> sendReservationConfirmationEmail((Reservation) context);
            case REGISTRATION_CONFIRMATION -> sendRegistrationConfirmationEmail((User) context);
            default -> throw new IllegalArgumentException("Unsupported email type");
        }
    }

    private void sendRegistrationConfirmationEmail(User user) {
        String subject = "Bienvenido a Ramoja Tours!";
        String body = String.format(
                "Hola! %s,\n\nGracias por registrarte en La Ramoja Tours. Esperamos que disfrutes nuestros servicios y puedas vivir grandes aventuras!\nTus datos de usuario son:\nNombre: %s\nemail: %s\n\nAquí tienes un enlace para ingresar a tu cuenta %s\n\nUn saludo!,\nEquipo La Ramoja",
                user.getName(),
                user.getName(),
                user.getEmail(),
                "VERCEL_FRONT_HOST/auth/login"
        );
        sendSimpleEmail(user.getEmail(), subject, body);
    }

    private void sendReservationConfirmationEmail(Reservation reservation) {


        String subject = "Confirmación de Reserva en Ramoja Tours";
        String body = String.format(
                "Hola %s,\n\nTu reserva para el tour %s en %s (nivel %s) en la fecha %s ha sido confirmada.\n\nGracias por escoger La Ramoja Tours!\n\nSaludos y buenos pegues!,\nEquipo La Ramoja",
                reservation.getUser().getName(),
                reservation.getTour().getCategory().getName(),
                reservation.getTour().getDestination(),
                reservation.getTour().getLevel(),
                reservation.getDate()
        );
        sendSimpleEmail(reservation.getUser().getEmail(), subject, body);
    }

    private void sendSimpleEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}
