import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from './Card';


const HandSelection = ({ activePlayer, setActivePlayer }) => {
  const [activePlayerSelectedHand, setActivePlayerSelectedHand] = useState([]);

  const handleHandClick = (card) => {
    setActivePlayerSelectedHand(prevHand => {
      const isCardSelected = prevHand.some(selectedCard => selectedCard.id === card.id);
      if (!isCardSelected && prevHand.length < 10) {
        return [...prevHand, card];
      }
      return prevHand;
    });
    console.log(`Clicked on card - Name: ${card.name} | Power: ${card.power}`);
    console.log(activePlayerSelectedHand);
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
            const response = await axios.get('http://localhost:8080/api/gamestate/togglePlayer');
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
      {activePlayer.deck.map((card) => (
        <CardWrapper
          key={card.id}
          isSelected={activePlayerSelectedHand.some(selectedCard => selectedCard.id === card.id)}
          onClick={() => handleHandClick(card)}
        >
          <Card card={card} />
        </CardWrapper>
      ))}
      <form onSubmit={handleHandSubmit}>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

const CardWrapper = styled.div`
    border: 2px solid #ccc;
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    background-color: ${props => props.isSelected ? '#e0e0e0' : 'white'};
`;

export default HandSelection;
