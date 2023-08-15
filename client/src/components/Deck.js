import React, { useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import axios from 'axios';


const Deck = ({activePlayer, setActivePlayer}) => {

    const [activePlayerSelectedHand, setActivePlayerSelectedHand] = useState([]);

    const handleHandChoiceClick = (card, name, power) => {
        console.log(`Clicked on card - Name: ${name} | Power: ${power}`);
        const isCardSelected = activePlayerSelectedHand.some((selectedCard) => selectedCard.id === card.id);
        if (!isCardSelected && activePlayerSelectedHand.length < 10) {
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
                    <CardContainer
                      key={card.id}
                      className={`card ${activePlayerSelectedHand.some((selectedCard) => selectedCard.id === card.id) ? 'selected' : ''}`}
                      onClick={() => handleHandChoiceClick(card, card.name, card.power)}
                    >
                        <Card card={card} />
                    </CardContainer>
                ))}
                  <form onSubmit={handleHandSubmit}>
                    <Button type="submit" value="Submit" />
                  </form>
        </>
     );
}

const Button = styled.input`
margin-top: 10px;
`;

const CardContainer = styled.div`
    position: relative;
    width: 100px;
    height: 150px;
    margin: 0;
    padding: 0;
    display: inline-block;
`;
 
 
export default Deck;