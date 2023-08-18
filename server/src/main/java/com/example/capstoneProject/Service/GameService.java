package com.example.capstoneProject.Service;

//import com.example.capstoneProject.controller.CardController;
import com.example.capstoneProject.models.Board;
import com.example.capstoneProject.models.Cards.Card;
import com.example.capstoneProject.models.GameState;
import com.example.capstoneProject.models.Player;
import com.example.capstoneProject.repositories.CardRepository;
import com.example.capstoneProject.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameService {

    CardRepository cardRepository;

    PlayerRepository playerRepository;
    GameState gameState;

    public GameService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
        this.gameState = new GameState();
    }


    //GETTER AND SETTERS

    public GameState getGameState() {
        return gameState;
    }

    public void setGameState(GameState gameState) {
        this.gameState = gameState;
    }

    public CardRepository getCardRepository() {
        return cardRepository;
    }

    public void setCardRepository(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    //GAME SERVICES

    public void startGame() {
        GameState gameState = new GameState();
        this.setGameState(gameState);
        System.out.println("GAME WAS STARTED");
    }

    //sets players a number 1 or 2 to allow board to assign positions, and makes the first player the active player
    public void setActivePlayerAtStart() {
        Player activePlayer = gameState.getListOfPlayers().get(0);
        gameState.setCurrentPlayer(activePlayer);
    }

    public ArrayList<Card> starterDeck(Player player) {
        ArrayList<Card> deck = new ArrayList<>();
        int i = 1;
        while (i <= 30) {
            double randomNum = Math.random();
            long finalRandomNum = Math.round((randomNum * 70) + 1);
            boolean existsInDeck = deck.stream().anyMatch(card -> card.getId() == finalRandomNum);
            if (existsInDeck) {
                continue;
            }
            Card cardFromDb = cardRepository.getReferenceById(finalRandomNum);
            cardFromDb.getPlayers().add(player);
            cardRepository.save(cardFromDb);
            deck.add(cardFromDb);
            i++;
        }
        player.setDeck(deck);
        return deck;
    }

    public ArrayList<Card> fetchPlayerDeck(Player player) {
        player.getDeck();
        return null;
    }

    public ArrayList<Card> playerDeckCheck(Player player) {
        // check if player has a deck/exists already
        // if he does fetch deck from DB
        // if not generate new deck by calling generateNewDeck()
        return null;
    }

    public void chooseHand(List<Card> hand) {
        getGameState().getCurrentPlayer().setHand(hand);
        System.out.println("This is the hand that we got from react!!!" + getGameState().getCurrentPlayer().getHand());
    }

    public void togglePlayer() {
        Player retrievedActivePlayer = getGameState().getCurrentPlayer();
        Player newCurrentPlayer = null;

        if (retrievedActivePlayer == getGameState().getListOfPlayers().get(0)) {
            newCurrentPlayer = getGameState().getListOfPlayers().get(1);
        } else if (retrievedActivePlayer == getGameState().getListOfPlayers().get(1)) {
            newCurrentPlayer = getGameState().getListOfPlayers().get(0);
        }
        getGameState().setCurrentPlayer(newCurrentPlayer);
    }


    public void addCardToBoard(Card chosenCard) {
        Long player1Id = gameState.getListOfPlayers().get(0).getId();
        Long player2Id = gameState.getListOfPlayers().get(1).getId();

        if (chosenCard.getCardType().equals("Unit")) {
            if (getGameState().getCurrentPlayer().getId() == player1Id) {
                if (chosenCard.getRowType().equals("Melee")) {
                    getGameState().getBoard().getPlayer1Cards().get("Melee").add(chosenCard);
                } else if (chosenCard.getRowType().equals("Range")) {
                    getGameState().getBoard().getPlayer1Cards().get("Range").add(chosenCard);
                } else if (chosenCard.getRowType().equals("Siege")) {
                    getGameState().getBoard().getPlayer1Cards().get("Siege").add(chosenCard);
                }

            } else if (getGameState().getCurrentPlayer().getId() == player2Id) {
                if (chosenCard.getRowType().equals("Melee")) {
                    getGameState().getBoard().getPlayer2Cards().get("Melee").add(chosenCard);
                } else if (chosenCard.getRowType().equals("Range")) {
                    getGameState().getBoard().getPlayer2Cards().get("Range").add(chosenCard);
                } else if (chosenCard.getRowType().equals("Siege")) {
                    getGameState().getBoard().getPlayer2Cards().get("Siege").add(chosenCard);
                }
            }
            List<Card> listOfCards = gameState.getCurrentPlayer().getHand();
            Optional<Card> optionalCardToRemove = listOfCards.stream()
                    .filter(card -> card.getName().equals(chosenCard.getName()))
                    .findFirst();

            optionalCardToRemove.ifPresent(card -> listOfCards.remove(card));

            gameState.getCurrentPlayer().setHand(listOfCards);

            System.out.println("Is it removing?");
            System.out.println("This is the current player hand" + gameState.getCurrentPlayer().getHand());
        }
    }

    //updates all the scores in Board
    public void tallyScores() {
        // Calculate scores for player1 melee
        ArrayList<Card> player1MeleeCards = getGameState().getBoard().getPlayer1Cards().get("Melee");
        int totalPlayer1MeleeScore = calculateRowTotal(player1MeleeCards);
        HashMap<String, Integer> player1scores = getGameState().getBoard().getPlayer1scores();
        player1scores.put("Melee", totalPlayer1MeleeScore);

        // Calculate scores for player1 range
        ArrayList<Card> player1RangeCards = getGameState().getBoard().getPlayer1Cards().get("Range");
        int totalPlayer1RangeScore = calculateRowTotal(player1RangeCards);
        player1scores.put("Range", totalPlayer1RangeScore);

        // Calculate scores for player1 siege
        ArrayList<Card> player1SiegeCards = getGameState().getBoard().getPlayer1Cards().get("Siege");
        int totalPlayer1SiegeScore = calculateRowTotal(player1SiegeCards);
        player1scores.put("Siege", totalPlayer1SiegeScore);

        // Update total score for player1
        int totalPlayer1Score = totalPlayer1MeleeScore + totalPlayer1RangeScore + totalPlayer1SiegeScore;
        player1scores.put("Total", totalPlayer1Score);

        // Calculate scores for player2 melee
        ArrayList<Card> player2MeleeCards = getGameState().getBoard().getPlayer2Cards().get("Melee");
        int totalPlayer2MeleeScore = calculateRowTotal(player2MeleeCards);
        HashMap<String, Integer> player2scores = getGameState().getBoard().getPlayer2scores();
        player2scores.put("Melee", totalPlayer2MeleeScore);

        // Calculate scores for player2 range
        ArrayList<Card> player2RangeCards = getGameState().getBoard().getPlayer2Cards().get("Range");
        int totalPlayer2RangeScore = calculateRowTotal(player2RangeCards);
        player2scores.put("Range", totalPlayer2RangeScore);

        // Calculate scores for player2 siege
        ArrayList<Card> player2SiegeCards = getGameState().getBoard().getPlayer2Cards().get("Siege");
        int totalPlayer2SiegeScore = calculateRowTotal(player2SiegeCards);
        player2scores.put("Siege", totalPlayer2SiegeScore);

        // Update total score for player2
        int totalPlayer2Score = totalPlayer2MeleeScore + totalPlayer2RangeScore + totalPlayer2SiegeScore;

        player2scores.put("Total", totalPlayer2Score);
    }


    public int calculateRowTotal(ArrayList<Card> row) {
        if (row == null) {
            return 0;
        }

        int total = 0;
        for (Card card : row) {
            if (card == null) {
                continue; // Skip this card and continue with the next one
            }

            total += card.getPower();
        }
        return total;
    }

    public void passRound(){
        // set active player isPassed to true
        gameState.getCurrentPlayer().setHasPassed(true);
    }

    public boolean hasPlayerPassed(){
        if(gameState.getCurrentPlayer().isHasPassed()){
            return true;
        }
        return false;
    }

    public boolean isRoundOver() {
        Player player1 = gameState.getListOfPlayers().get(0);
        Player player2 = gameState.getListOfPlayers().get(1);

        boolean isPlayer1HandEmpty = player1.getHand().isEmpty();
        boolean isPlayer2HandEmpty = player2.getHand().isEmpty();
        boolean isPlayer1Passed = player1.isHasPassed();
        boolean isPlayer2Passed = player2.isHasPassed();

        return (isPlayer1HandEmpty && isPlayer2HandEmpty) ||
                (isPlayer1Passed && isPlayer2Passed) ||
                (isPlayer1HandEmpty && isPlayer2Passed) ||
                (isPlayer1Passed && isPlayer2HandEmpty);
    }

    public String endRound() {
        // Get total scores for each player
        int player1score = gameState.getBoard().getPlayer1scores().get("Total");
        int player2score = gameState.getBoard().getPlayer2scores().get("Total");

        // Determine round winner
        if (player1score > player2score) {
            gameState.getListOfPlayers().get(1).setLives(gameState.getListOfPlayers().get(1).getLives() - 1);
            return (gameState.getListOfPlayers().get(0).getName() + " won the round");
        } else if (player2score > player1score) {
            gameState.getListOfPlayers().get(0).setLives(gameState.getListOfPlayers().get(0).getLives() - 1);
            return (gameState.getListOfPlayers().get(1).getName() + " won the round");
        } else {
            gameState.getListOfPlayers().get(1).setLives(gameState.getListOfPlayers().get(1).getLives() - 1);
            gameState.getListOfPlayers().get(0).setLives(gameState.getListOfPlayers().get(0).getLives() - 1);
            return "round ended in a draw";
        }
    }

    public void resetRoundState() {
        // Set has passed back to false for next round
        gameState.getListOfPlayers().get(0).setHasPassed(false);
        gameState.getListOfPlayers().get(1).setHasPassed(false);

        // Clear the board for the next round
        gameState.getBoard().clearBoard();
    }


    public boolean isGameOver(){
        // if either player has ran out of lives or if both players have ran out of cards
        return gameState.getListOfPlayers().get(0).getLives() == 0 ||
                gameState.getListOfPlayers().get(1).getLives() == 0 ||

                gameState.getListOfPlayers().get(0).getHand().isEmpty() &&
                gameState.getListOfPlayers().get(1).getHand().isEmpty();
    }

    public String endGame(){
        //determine the final winner based on player lives
        if (gameState.getListOfPlayers().get(0).getLives() == 0 || gameState.getListOfPlayers().get(0).getLives() < gameState.getListOfPlayers().get(1).getLives()) {
            return (gameState.getListOfPlayers().get(1).getName() + " wins the game!");
        } else if (gameState.getListOfPlayers().get(1).getLives() == 0 || gameState.getListOfPlayers().get(1).getLives() < gameState.getListOfPlayers().get(0).getLives()) {
            return (gameState.getListOfPlayers().get(0).getName() + " wins the game!");
        }
        else {
            return "Game ended in a draw!";
        }
    }

}










//    public void startSetup() {
//        //wait for react to get player names
//        //check if player exists in DB (call playerDeckCheck())
//        //call getPlayerHand(), fetches the hand selection of the player from react
//
//        // Get player names and initialize players from react
//        //set players to gameclass
//
//        // Initialize the board
//        board = new Board(player1, player2);
//
//        // Start the game
//        playGame();
//    }
//
//    private void playGame() {
//        // Implement the main game loop
//        boolean gameOver = false;
//
//        while (!gameOver) {
//            // Begin the round
//            player1.setHasPassed(false);
//            player2.setHasPassed(false);
//
//            // Begin the turn for player1
//            playTurn(player1);
//
//            // Check if the round or game is over
//            if (isRoundOver()) {
//                endRound();
//                if (isGameOver()) {
//                    gameOver = true;
//                }
//            }
//
//            // Begin the turn for player2
//            playTurn(player2);
//
//            // Check if the round or game is over
//            if (isRoundOver()) {
//                endRound();
//                if (isGameOver()) {
//                    gameOver = true;
//                }
//            }
//        }
//
//        // End the game
//        endGame();
//    }
//
//    private boolean isRoundOver() {
//
//        return (player1.getHand().isEmpty() && player2.getHand().isEmpty()) ||
//                (player1.isHasPassed() && player2.isHasPassed()) ||
//                (player1.getHand().isEmpty() && player2.isHasPassed()) ||
//                (player1.isHasPassed()  && player2.getHand().isEmpty());
//    }


//    public Board getBoard() {
//        return board;
//    }
//
//    public void setBoard(Board board) {
//        this.board = board;
//    }
//
//    public Player getCurrentPlayer() {
//        return currentPlayer;
//    }
//
//    public void setCurrentPlayer(Player currentPlayer) {
//        this.currentPlayer = currentPlayer;
//    }
//
//    public ArrayList<Player> getListOfPlayers() {
//        return listOfPlayers;
//    }
//
//    public void setListOfPlayers(ArrayList<Player> listOfPlayers) {
//        this.listOfPlayers = listOfPlayers;
//    }


