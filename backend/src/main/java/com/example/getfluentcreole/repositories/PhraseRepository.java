package com.example.getfluentcreole.repositories;

import com.example.getfluentcreole.models.Phrase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhraseRepository extends JpaRepository<Phrase, Integer> {}