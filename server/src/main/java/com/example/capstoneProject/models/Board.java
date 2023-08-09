package com.example.capstoneProject.models;

import com.example.capstoneProject.models.Cards.Card;
import com.example.capstoneProject.models.Cards.Melee;
import com.example.capstoneProject.models.Cards.Range;
import com.example.capstoneProject.models.Cards.Siege;

import java.util.ArrayList;
import java.util.HashMap;

public class Board {
    private HashMap<String, ArrayList<Card>> player1Cards;  // HashMap to hold player 1 cards
    private HashMap<String, ArrayList<Card>> player2Cards;  // HashMap to hold player 2 cards

    private HashMap<String, Integer> player1scores;
    private HashMap<String, Integer> player2scores;


    public Board() {

        player1Cards = new HashMap<>();
        player1Cards.put("Melee", new ArrayList<>());
        player1Cards.put("Range", new ArrayList<>());
        player1Cards.put("Siege", new ArrayList<>());

        player1scores = new HashMap<>();
        player1scores.put("Melee", 0);
        player1scores.put("Range", 0);
        player1scores.put("Siege", 0);
        player1scores.put("Total", 0);

        player2Cards = new HashMap<>();
        player2Cards.put("Melee", new ArrayList<>());
        player2Cards.put("Range", new ArrayList<>());
        player2Cards.put("Siege", new ArrayList<>());

        player2scores = new HashMap<>();
        player2scores.put("Melee", 0);
        player2scores.put("Range", 0);
        player2scores.put("Siege", 0);
        player2scores.put("Total", 0);

    }

    public HashMap<String, ArrayList<Card>> getPlayer1Cards() {
        return player1Cards;
    }

    public void setPlayer1Cards(HashMap<String, ArrayList<Card>> player1Cards) {
        this.player1Cards = player1Cards;
    }

    public HashMap<String, ArrayList<Card>> getPlayer2Cards() {
        return player2Cards;
    }

    public void setPlayer2Cards(HashMap<String, ArrayList<Card>> player2Cards) {
        this.player2Cards = player2Cards;
    }

    public HashMap<String, Integer> getPlayer1scores() {
        return player1scores;
    }

    public void setPlayer1scores(HashMap<String, Integer> player1scores) {
        this.player1scores = player1scores;
    }

    public HashMap<String, Integer> getPlayer2scores() {
        return player2scores;
    }

    public void setPlayer2scores(HashMap<String, Integer> player2scores) {
        this.player2scores = player2scores;
    }

    public void clearBoard(){
        player1Cards.get("Melee").clear();
        player1Cards.get("Range").clear();
        player1Cards.get("Siege").clear();
        player2Cards.get("Melee").clear();
        player2Cards.get("Range").clear();
        player2Cards.get("Siege").clear();

        player1scores.put("Melee", 0);
        player1scores.put("Range", 0);
        player1scores.put("Siege", 0);
        player1scores.put("Total", 0);

        player2scores.put("Melee", 0);
        player2scores.put("Range", 0);
        player2scores.put("Siege", 0);
        player2scores.put("Total", 0);
    }
}
