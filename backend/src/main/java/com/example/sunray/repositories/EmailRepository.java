package com.example.sunray.repositories;

import com.example.sunray.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {
    Optional<Email> findByEmail(String email);

    @Query("SELECT e FROM Email e  ORDER BY e.repeats DESC LIMIT 10")
    List<Email> getMostFrequentlySentEmails();
}
