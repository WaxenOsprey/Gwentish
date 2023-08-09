package com.example.capstoneProject.controller;

import com.example.capstoneProject.Service.GameService;
import com.example.capstoneProject.models.Board;
import com.example.capstoneProject.models.Cards.Card;
import com.example.capstoneProject.models.GameState;
import com.example.capstoneProject.models.Player;
import com.example.capstoneProject.repositories.CardRepository;
import com.example.capstoneProject.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class GameController {
    @Autowired
    PlayerRepository playerRepository;
    @Autowired
    CardRepository cardRepository;
    @Autowired
    GameService gameService;

//    @GetMapping(value = "/cards")
//    public ResponseEntity<List<Card>> getAllCards(){
//        return new ResponseEntity<>(cardRepository.findAll(), HttpStatus.OK);
//    }


    @PostMapping(value = "/api/game/initialise")
    public ResponseEntity<HttpStatus> initialiseGame(@RequestBody ArrayList<Player> players) {

        gameService.startGame();
        gameService.getGameState().setListOfPlayers(players);
        gameService.setActivePlayerAtStart();

        System.out.println("This is the list of players" + gameService.getGameState().getListOfPlayers());
        Player player1 = gameService.getGameState().getListOfPlayers().get(0);
        Player player2 = gameService.getGameState().getListOfPlayers().get(1);

        playerRepository.save(player1);
        playerRepository.save(player2);

        gameService.starterDeck(player1);
        gameService.starterDeck(player2);

        System.out.println("current player deck:" + gameService.getGameState().getCurrentPlayer().getDeck());
        return new ResponseEntity<>(HttpStatus.OK);

    }

    //We are using this function to return a player, in order to fetch their deck
    @GetMapping(value = "/api/gamestate/getActivePlayer")
    public ResponseEntity<Player> getActivePlayer() {
        return new ResponseEntity<>(gameService.getGameState().getCurrentPlayer(), HttpStatus.OK);
    }

    //switch player at the backend and return active player for front
    //also checks if the new player has passed and if so skips their turn by switching player again
    @GetMapping(value = "api/gamestate/togglePlayer")
    public ResponseEntity<Player> toggleActivePlayer(){
        gameService.togglePlayer();
        //checks if current player has passed round
        if (gameService.hasPlayerPassed()){
            gameService.togglePlayer();
        }
        return new ResponseEntity<>(gameService.getGameState().getCurrentPlayer(), HttpStatus.OK);
    }

    //post a card to play to the board
    @PostMapping(value = "api/gamestate/playCard")
    public ResponseEntity<HttpStatus> playNewCard (@RequestBody Card chosenCard){
        //adds to board, removes from hand
        gameService.addCardToBoard(chosenCard);
        System.out.println("Card posted: " + chosenCard);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //get the updated board
    @GetMapping(value = "api/gamestate/getBoard")
    public ResponseEntity<Board> getBoard(){
        gameService.tallyScores();
        return new ResponseEntity<>(gameService.getGameState().getBoard(), HttpStatus.OK);
    }

    //passRound
    @GetMapping(value = "api/gamestate/passRound")
    public ResponseEntity<HttpStatus> passRound(){
        gameService.passRound();
        System.out.println(gameService.getGameState().getCurrentPlayer().getName() + " has passed the round");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "api/gamestate/isRoundOver")
    public ResponseEntity<Boolean> isRoundOver(){
        if (gameService.isRoundOver()){
            gameService.endRound();
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }

    @GetMapping(value = "api/gamestate/isGameOver")
    public ResponseEntity<Boolean> isGameOver(){
        if(gameService.isGameOver()){
            gameService.endGame();
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }
    @GetMapping(value = "/api/gamestate/getGameStatus")
    public ResponseEntity<String> getGameStatus() {
        if (gameService.isGameOver()) {
            return new ResponseEntity<>("Game Over!", HttpStatus.OK);
        } else if (gameService.isRoundOver()) {
            return new ResponseEntity<>("Round Over!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Next Turn", HttpStatus.OK);
        }
    }
    @GetMapping(value = "/api/gamestate/getPlayerList")
    public ResponseEntity<List<Player>> getPlayerLives() {
        return new ResponseEntity<>(gameService.getGameState().getListOfPlayers(), HttpStatus.OK);
    }




//    @GetMapping(value = "/api/gamestate/getHand")
//    public ResponseEntity<Player> getHandFromGameState() {
//        return new ResponseEntity<>(gameService.getGameState().getCurrentPlayer(), HttpStatus.OK);
//    }


}
