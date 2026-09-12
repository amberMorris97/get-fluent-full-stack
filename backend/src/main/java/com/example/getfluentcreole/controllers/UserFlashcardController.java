package com.example.getfluentcreole.controllers;

import com.example.getfluentcreole.dto.request.UserFlashcardRequestDTO;
import com.example.getfluentcreole.dto.response.UserFlashcardResponseDTO;
import com.example.getfluentcreole.exceptions.ItemAlreadyExistsException;
import com.example.getfluentcreole.models.Phrase;
import com.example.getfluentcreole.models.User;
import com.example.getfluentcreole.models.UserFlashcard;
import com.example.getfluentcreole.repositories.PhraseRepository;
import com.example.getfluentcreole.repositories.UserFlashcardRepository;
import com.example.getfluentcreole.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userFlashcards")
public class UserFlashcardController {

    @Autowired
    UserFlashcardRepository userFlashcardRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PhraseRepository phraseRepository;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/addFlashcard")
    public UserFlashcardRequestDTO createNewUserFlashcard(@RequestBody UserFlashcardRequestDTO dto) {
        User user = userRepository.findByEmailAddress(dto.getEmail()).orElse(null);
        Phrase phrase = phraseRepository.findById(dto.getPhraseId()).orElse(null);

        assert phrase != null;
        if (userFlashcardRepository.existsByUserAndPhraseId(user, phrase.getId())) {
            throw new ItemAlreadyExistsException("Flashcard already exists for this user and phrase.");
        }

        UserFlashcard userFlashcard = new UserFlashcard(user, phrase, dto.getStatus());
        userFlashcardRepository.save(userFlashcard);
        return dto;
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUserFlashcards(@PathVariable String email) {
        User user = userRepository.findByEmailAddress(email).orElse(null);
        List<UserFlashcard> flashcards = userFlashcardRepository.findAllByUser(user);
        List<UserFlashcardResponseDTO> dtos = flashcards.stream()
                .map(UserFlashcardResponseDTO::new)
                .toList();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @DeleteMapping("/{flashcardId}")
    public ResponseEntity<?> deleteUserFlashcard(@PathVariable int flashcardId, Authentication authentication) {
        String requestingEmail = authentication.getName();

        UserFlashcard flashcard = userFlashcardRepository.findById(flashcardId).orElse(null);
        if (flashcard == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (!flashcard.getUser().getEmailAddress().equals(requestingEmail)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        userFlashcardRepository.deleteById(flashcardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}