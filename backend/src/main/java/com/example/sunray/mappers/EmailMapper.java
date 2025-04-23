package com.example.sunray.mappers;

import com.example.sunray.dto.EmailDto;
import com.example.sunray.entity.Email;

public class EmailMapper {

    public static EmailDto mapToEmailDto(Email email){
        return new EmailDto(
                email.getId(),
                email.getEmail(),
                email.getRepeats()
        );
    }

    public static Email mapToEmail(EmailDto emailDto){
        return new Email(
                emailDto.getId(),
                emailDto.getEmail(),
                emailDto.getRepeats()
        );
    }
}
