package com.example.getfluentcreole.controllers;

import com.example.getfluentcreole.dto.PhraseDTO;
import com.example.getfluentcreole.models.Phrase;
import com.example.getfluentcreole.repositories.PhraseRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/phrases")
public class PhraseController {

    @Autowired
    PhraseRepository phraseRepository;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping("")
    public ResponseEntity<?> getAllPhrases() {
        List<Phrase> phrases = phraseRepository.findAll();
        return new ResponseEntity<>(phrases, HttpStatus.OK);
    }

    @GetMapping("/randomPhrase")
    public PhraseDTO getRandomPhrase() {
        List<Phrase> phrases = phraseRepository.findAll();
        int randomIndex = (int) (Math.random() * phrases.size());
        Phrase randomPhrase = phrases.get(randomIndex);
        return modelMapper.map(randomPhrase, PhraseDTO.class);
    }
}
