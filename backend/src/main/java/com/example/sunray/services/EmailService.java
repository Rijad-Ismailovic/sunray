package com.example.sunray.services;

import com.example.sunray.dto.EmailDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.IOException;
import java.util.List;


public interface EmailService {
    EmailDto createEmail(EmailDto emailDto) throws Exception;

    List<EmailDto> getAllEmails();
}
