package dh.backend.mojarra_tours.service;
import dh.backend.mojarra_tours.enums.EmailType;
public interface IMailService {
    void sendEmail(EmailType emailType, Object context);
}

