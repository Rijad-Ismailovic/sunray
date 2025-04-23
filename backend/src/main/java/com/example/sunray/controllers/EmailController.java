package com.example.sunray.controllers;

import com.example.sunray.dto.EmailDto;
import com.example.sunray.services.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/emails")
public class EmailController {
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<List<EmailDto>> createEmail(@RequestBody List<EmailDto> emailDtos) throws Exception {
        List<EmailDto> createdEmails = new ArrayList<>();
        for (EmailDto emailDto : emailDtos) {
            EmailDto createdEmail = emailService.createEmail(emailDto);
            createdEmails.add(createdEmail);
        }
        return new ResponseEntity<>(createdEmails, HttpStatus.CREATED);
    }

    @RequestMapping
    public ResponseEntity<List<EmailDto>> getAllEmails(){
        List<EmailDto> emails = emailService.getAllEmails();
        return ResponseEntity.ok(emails);
    }
}
