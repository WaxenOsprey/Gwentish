package com.example.capstoneProject.models;

import com.example.capstoneProject.Service.GameService;
import com.example.capstoneProject.models.Cards.Card;

import java.util.ArrayList;
import java.util.List;

public class GameState {
    private Player currentPlayer;
    private ArrayList<Player> listOfPlayers;
    private Board board;

    public GameState() {
        this.currentPlayer = new Player();
        this.listOfPlayers = new ArrayList<>();
        this.board = new Board();
    }

    public GameState(Player currentPlayer, ArrayList<Player> listOfPlayers, Board board) {
        this.currentPlayer = currentPlayer;
        this.listOfPlayers = listOfPlayers;
        this.board = board;
    }

    public Player getCurrentPlayer() {
        return currentPlayer;
    }
    public List<Card> getCurrentPlayersDeck() {
        return currentPlayer.getDeck();
    }

    public void setCurrentPlayer(Player currentPlayer) {
        this.currentPlayer = currentPlayer;
    }

    public ArrayList<Player> getListOfPlayers() {
        return listOfPlayers;
    }

    public void setListOfPlayers(ArrayList<Player> listOfPlayers) {
        this.listOfPlayers = listOfPlayers;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public void addPlayer(Player player) {
        listOfPlayers.add(player);
    }
}
