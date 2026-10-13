package com.example.getfluentcreole.controllers;

import com.example.getfluentcreole.models.Phrase;
import com.example.getfluentcreole.repositories.PhraseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class PhraseControllerTest {

    @Mock
    private PhraseRepository phraseRepository;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        PhraseController phraseController = new PhraseController();
        phraseController.phraseRepository = phraseRepository;
        phraseController.modelMapper = new ModelMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(phraseController).build();
    }

    private Phrase phrase(int id, String english, String haitianCreole, String pronunciation) {
        Phrase phrase = new Phrase(english, haitianCreole, pronunciation);
        phrase.setId(id);
        return phrase;
    }

    @Test
    void getAllPhrases_returnsAllPhrasesFromRepository() throws Exception {
        when(phraseRepository.findAll()).thenReturn(List.of(
                phrase(1, "Hello", "Bonjou", "bohn-ZHOO"),
                phrase(2, "Thank you", "Mèsi", "meh-SEE")
        ));

        mockMvc.perform(get("/api/phrases"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].english", is("Hello")))
                .andExpect(jsonPath("$[0].haitianCreole", is("Bonjou")))
                .andExpect(jsonPath("$[0].pronunciation", is("bohn-ZHOO")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].english", is("Thank you")))
                .andExpect(jsonPath("$[1].haitianCreole", is("Mèsi")))
                .andExpect(jsonPath("$[1].pronunciation", is("meh-SEE")));

        verify(phraseRepository, times(1)).findAll();
    }

    @Test
    void getAllPhrases_returnsEmptyListWhenNoPhrases() throws Exception {
        when(phraseRepository.findAll()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/phrases"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void getRandomPhrase_returnsOnlyPhraseMappedToDto() throws Exception {
        when(phraseRepository.findAll()).thenReturn(List.of(
                phrase(7, "Good night", "Bòn nwit", "bun NWEET")
        ));

        mockMvc.perform(get("/api/phrases/randomPhrase"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.english", is("Good night")))
                .andExpect(jsonPath("$.haitianCreole", is("Bòn nwit")))
                .andExpect(jsonPath("$.pronunciation", is("bun NWEET")))
                // PhraseDTO does not expose the entity id
                .andExpect(jsonPath("$.id").doesNotExist());

        verify(phraseRepository, times(1)).findAll();
    }

    @Test
    void getRandomPhrase_returnsOneOfTheAvailablePhrases() throws Exception {
        when(phraseRepository.findAll()).thenReturn(List.of(
                phrase(1, "Hello", "Bonjou", "bohn-ZHOO"),
                phrase(2, "Thank you", "Mèsi", "meh-SEE"),
                phrase(3, "Goodbye", "Orevwa", "oh-ray-VWAH")
        ));

        for (int i = 0; i < 20; i++) {
            mockMvc.perform(get("/api/phrases/randomPhrase"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.english", anyOf(is("Hello"), is("Thank you"), is("Goodbye"))));
        }
    }

    @Test
    void getRandomPhrase_handlesNullPronunciation() throws Exception {
        when(phraseRepository.findAll()).thenReturn(List.of(
                phrase(1, "Yes", "Wi", null)
        ));

        mockMvc.perform(get("/api/phrases/randomPhrase"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.english", is("Yes")))
                .andExpect(jsonPath("$.haitianCreole", is("Wi")))
                .andExpect(jsonPath("$.pronunciation", nullValue()));
    }
}
