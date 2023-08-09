package com.example.capstoneProject;

import com.example.capstoneProject.Service.GameService;
//import com.example.capstoneProject.controller.CardController;
import com.example.capstoneProject.models.Cards.Card;
import com.example.capstoneProject.models.GameState;
import com.example.capstoneProject.models.Player;
import com.example.capstoneProject.repositories.CardRepository;
import com.example.capstoneProject.repositories.PlayerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class CapstoneProjectApplicationTests {

//	@Autowired
//	CardController cardController;
	@Autowired
	CardRepository cardRepository;
	@Autowired
	PlayerRepository playerRepository;

	@Test
	void contextLoads() {
	}

	@Test
	void canFetch(){

	}
	@Test
	public void canFindMeleeCards(){
		List<Card> foundCards = cardRepository.findByRowType("Melee");
		for (Card card : foundCards){
			System.out.println(card.getRowType());
		}
		assertEquals("Melee", foundCards.get(0).getRowType());
	}
	@Test
	public void canFindRangeCards(){
		List<Card> foundCards = cardRepository.findByRowType("Range");
		for (Card card : foundCards){
			System.out.println(card.getRowType());
		}
		assertEquals("Range", foundCards.get(0).getRowType());
	}
	@Test
	public void canFindSiegeCards(){
		List<Card> foundCards = cardRepository.findByRowType("Siege");
		for (Card card : foundCards){
			System.out.println(card.getRowType());
		}
		assertEquals("Siege", foundCards.get(0).getRowType());
	}
	@Test
	public void canGetStarterDeck(){
		Player player = new Player("Hello");
		playerRepository.save(player);
		GameService newGame = new GameService(cardRepository);
		newGame.starterDeck(player);
		System.out.println(player.getDeck());
		assertEquals(player.getDeck().size(), 30);
	}

	@Test
	public void canTogglePlayer() {
		Player player1 = new Player("One");
		Player player2 = new Player("Two");
		playerRepository.save(player1);
		playerRepository.save(player2);
		GameService newService = new GameService(cardRepository);
		newService.startGame();

		ArrayList<Player> players = new ArrayList<>();
		players.add(player1);
		players.add(player2);
		newService.getGameState().setListOfPlayers(players);

		newService.getGameState().setCurrentPlayer(player1);

		System.out.println("Selected player was: " + newService.getGameState().getCurrentPlayer().getName());

		newService.togglePlayer();

		System.out.println("Selected player now is: " + newService.getGameState().getCurrentPlayer().getName());
		assertEquals("Two", newService.getGameState().getCurrentPlayer().getName());

		newService.togglePlayer();

		System.out.println("Selected player now is back to: " + newService.getGameState().getCurrentPlayer().getName());

		assertEquals("One", newService.getGameState().getCurrentPlayer().getName());

	}

	@Test
	public void canAddCardToBoard(){
		Player player1 = new Player("One");
		Player player2 = new Player("Two");
		playerRepository.save(player1);
		playerRepository.save(player2);
		GameService newService = new GameService(cardRepository);
		newService.startGame();
		newService.getGameState().addPlayer(player1);
		newService.getGameState().addPlayer(player2);
		newService.setActivePlayerAtStart();


		Card testCard = new Card(
						"Ciri",
						"Witcher",
						"Whenever you lose a round, return this unit from the battlefield to your hand.",
						"Whenever you lose a round, return this unit from the battlefield to your hand.",
						"",
						"I go wherever I please, whenever I please.",
						1007,
						112101,
						1207,
						"BaseSet",
						"Unit",
						0,
						"Gold",
						6,
						0,
						"Anna Podedworna",
						"Legendary",
						"Neutral",
						"",
						8,
						"",
						"Range"
				);

		newService.addCardToBoard(testCard);

		assertEquals(testCard.getName(), newService.getGameState().getBoard().getPlayer1Cards().get("Range").get(0).getName());
	}
}
