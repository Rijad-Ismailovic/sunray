package com.example.sunray.services;

import com.example.sunray.utils.Utils;
import com.fasterxml.jackson.core.type.TypeReference;
import com.example.sunray.dto.EmailDto;
import com.example.sunray.entity.Email;
import com.example.sunray.mappers.EmailMapper;
import com.example.sunray.repositories.EmailRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class EmailServiceImpl implements EmailService{
    private EmailRepository emailRepository;

    @Override
    public EmailDto createEmail(EmailDto emailDto) throws Exception {
        Email email = EmailMapper.mapToEmail(emailDto);

        if(Utils.isEmailBlacklisted(email.getEmail())){
            throw new Exception("Email is blacklisted");
        }

        Optional<Email> optionalEmail = emailRepository.findByEmail(emailDto.getEmail());

        if (optionalEmail.isEmpty()) {
            Email savedEmail = emailRepository.save(email);
            return EmailMapper.mapToEmailDto(savedEmail);
        } else {
            Email existingEmail = optionalEmail.get();
            existingEmail.setRepeats(existingEmail.getRepeats() + 1);
            Email updatedEmail = emailRepository.save(existingEmail);
            return EmailMapper.mapToEmailDto(updatedEmail);
        }

    }

    @Override
    public List<EmailDto> getAllEmails() {
        List<Email> emails = emailRepository.getMostFrequentlySentEmails();

        return emails.stream().map((email -> EmailMapper.mapToEmailDto(email))).collect(Collectors.toList());
    }
}
