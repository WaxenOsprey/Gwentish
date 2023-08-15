import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from './Card';
import handlePassRound from './HandlePassRound';


const Hand = ({activePlayer, setActivePlayer}) => {

    const [activePlayerSelectedCard, setActivePlayerSelectedCard] = useState(null);

    const handleChosenCardClick = (card, name, power) => {
        console.log(`Clicked on card - Name: ${name} | Power: ${power}`);
        setActivePlayerSelectedCard(card);
      };
  
      const handleChosenCardSubmission = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            'http://localhost:8080/api/gamestate/playCard',
            activePlayerSelectedCard
          );
          if (response.status === 200) {
            try {
              const roundOverResponse = await axios.get('http://localhost:8080/api/gamestate/isRoundOver');
              console.log(roundOverResponse.data);
              if (roundOverResponse.data === true) {
                console.log("The round is over");
                alert("The Round is Over!")
      
                try {
                  const gameOverResponse = await axios.get('http://localhost:8080/api/gamestate/isGameOver');
                  console.log(gameOverResponse.data);
                  if (gameOverResponse.data === true) {
                    console.log("The game is over");
                    alert("The Game is Over!")
                    
                  } else {
                  }
                } catch (error) {
                  console.error(error);
                }
              } else {
                const toggleResponse = await axios.get('http://localhost:8080/api/gamestate/togglePlayer');
                console.log(toggleResponse.data);
                setActivePlayer(toggleResponse.data);
              }
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

    return ( 
        <>
                {activePlayer.hand.map((card) => (
                    <CardContainer
                      key={card.id}
                      className={`card ${activePlayerSelectedCard && activePlayerSelectedCard.id === card.id ? 'selected' : ''}`}
                      onClick={() => handleChosenCardClick(card, card.name, card.power)}
                    >
                        <Card card={card} />
                    </CardContainer>
                ))}
                    <form onSubmit={handleChosenCardSubmission}>
                    <Button type="submit" value="Submit" />
                    </form>

                {activePlayer.hand.length > 1 && (
                    <form onSubmit={(e) => handlePassRound(e, activePlayer, setActivePlayer)}>
                    <Button type="submit" value="Pass Round" />
                    </form>
              )}
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
 
export default Hand;