import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Card from './Card';
import axios from 'axios';

const Deck = ({ activePlayer, setActivePlayer, listOf2Players }) => {
  const [activePlayerSelectedHand, setActivePlayerSelectedHand] = useState([]);

  const handleHandChoiceClick = (card, name, power) => {
    console.log(`Clicked on card - Name: ${name} | Power: ${power}`);

    // Check if the card is already selected
    const isCardSelected = activePlayerSelectedHand.some(
      (selectedCard) => selectedCard.id === card.id
    );

    // If it's selected, remove it from the selected hand; otherwise, add it
    if (isCardSelected) {
      setActivePlayerSelectedHand((prevHand) =>
        prevHand.filter((selectedCard) => selectedCard.id !== card.id)
      );
    } else if (activePlayerSelectedHand.length < 10) {
      setActivePlayerSelectedHand((prevHand) => [...prevHand, card]);
    }
  };

  const handleHandSubmit = async (e) => {
    if (activePlayer.hand.length >= 1) {
      e.preventDefault();
      console.log("You've already submitted your hand");
    } else {
      setActivePlayerSelectedHand([]);
      e.preventDefault();
      try {
        const response = await axios.post(
          'http://localhost:8080/api/players/hand',
          activePlayerSelectedHand
        );
        if (response.status === 200) {
          try {
            const response = await axios.get(
              'http://localhost:8080/api/gamestate/togglePlayer'
            );
            console.log(response.data);
            setActivePlayer(response.data);
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <DeckWrapper activePlayer={activePlayer} listOf2Players={listOf2Players}>
        <DeckContainer>
          <PlayerPrompt
            activePlayer={activePlayer}
            listOf2Players={listOf2Players}
          >
            {activePlayer.name +
              ": " +
              "Select a hand to play with from your deck! " +
              activePlayerSelectedHand.length +
              "/10"}
          </PlayerPrompt>
          <form onSubmit={handleHandSubmit}>
            <Button type="submit" value="Ready!" />
          </form>
          <Cards>
            {activePlayer.deck.map((card) => (
              <CardContainer
                key={card.id}
                className={`card ${
                  activePlayerSelectedHand.some(
                    (selectedCard) => selectedCard.id === card.id
                  )
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  handleHandChoiceClick(card, card.name, card.power)
                }
                activePlayer={activePlayer}
                listOf2Players={listOf2Players}
              >
                <Card card={card} />
              </CardContainer>
            ))}
          </Cards>
        </DeckContainer>
      </DeckWrapper>
    </>
  );
};


const DeckWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  border: 3px solid;
    border-color: ${({ activePlayer, listOf2Players }) =>
    (activePlayer && listOf2Players && listOf2Players[0]) ? (activePlayer.name === listOf2Players[0].name ? 'lightseagreen' : 'rgb(170, 102, 242)') : 'rgb(170, 102, 242)'};

  `;

const DeckContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding-bottom: 20px;
  flex-direction: row;
`

const flash = keyframes`
  0%, 100% {
    color: gold;
  }
  50% {
    color: red; 
  }
`;


const Button = styled.input`
  margin-top: 10px;
  height: 50px;
  width: 100px;
  font-size: 20px;
  font-weight: bold;
  color: gold;
  background-color: rgb(76, 46, 20);
  animation: ${flash} 1s linear infinite;

  &:hover {
    background-color: grey;
  }



`;

const CardContainer = styled.div`
  position: relative;
  width: 100px;
  height: 150px;
  margin: 5px;
  padding: 0;
  display: inline-block;

  &.selected {
    box-shadow: 0px 0px 8px rgba(255, 223, 0, 0.5);
    border: 3px solid;
    border-color: ${({ activePlayer, listOf2Players }) =>
      (activePlayer && listOf2Players && listOf2Players[0]) ? (activePlayer.name === listOf2Players[0].name ? 'lightseagreen' : 'rgb(170, 102, 242)') : 'rgb(170, 102, 242)'};

  }
`;

const PlayerPrompt = styled.h2`
  text-align: center;
  margin: 10px;
  padding: 0;
  color: ${({ activePlayer, listOf2Players }) =>
    (activePlayer && listOf2Players && listOf2Players[0]) ? (activePlayer.name === listOf2Players[0].name ? 'lightseagreen' : 'rgb(170, 102, 242)') : 'rgb(170, 102, 242)'};

`;
 
 
export default Deck;