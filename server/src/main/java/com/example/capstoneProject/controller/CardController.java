package com.example.capstoneProject.controller;

import com.example.capstoneProject.models.Cards.Card;
import com.example.capstoneProject.repositories.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
public class CardController {

    @Autowired
    CardRepository cardRepository;

@GetMapping(value = "/cards")
    public ResponseEntity<List<Card>> getAllCards(){
        return new ResponseEntity<>(cardRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/cards/melee")
    public ResponseEntity<List<Card>> getAllMeleeCards(
            @RequestParam(required = false, name = "rowType") String rowType

    )
    {
        if (rowType != null){
            return new ResponseEntity(cardRepository.findByRowType(rowType), HttpStatus.OK);
        }
        return new ResponseEntity(cardRepository.findAll(), HttpStatus.OK);

    }

}
