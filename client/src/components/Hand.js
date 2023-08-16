import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from './Card';
import handlePassRound from './HandlePassRound';


const Hand = ({activePlayer, setActivePlayer}) => {

    const [activePlayerSelectedCard, setActivePlayerSelectedCard] = useState(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
          switch (event.key) {
            case 'ArrowLeft':
              event.preventDefault();
              selectPreviousCard();
              break;
            case 'ArrowRight':
              event.preventDefault();
              selectNextCard();
              break;
            case 'Enter':
              handleChosenCardSubmission(event);
              break;
            case ' ':
              handlePassRound(event, activePlayer, setActivePlayer);
              break;
            default:
              break;
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [activePlayerSelectedCard]);

    const selectPreviousCard = () => {
        const currentIndex = activePlayer.hand.findIndex(card => card.id === activePlayerSelectedCard?.id);
            if (currentIndex > 0) {
            setActivePlayerSelectedCard(activePlayer.hand[currentIndex - 1]);
            }
        };
    
      const selectNextCard = () => {
        const currentIndex = activePlayer.hand.findIndex(card => card.id === activePlayerSelectedCard?.id);
        if (currentIndex < activePlayer.hand.length - 1) {
          setActivePlayerSelectedCard(activePlayer.hand[currentIndex + 1]);
        }
      };


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
                <HandContainer>
                    {activePlayer.hand.map((card) => (
                        <CardContainer
                          key={card.id}
                          isCurrent={activePlayerSelectedCard && activePlayerSelectedCard.id === card.id}
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
                </HandContainer>
        </>
     );
}

const HandContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.input`
margin-top: 10px;
`;

const CardContainer = styled.div`
  margin: 0;
  padding: 0;
  ${({ isCurrent }) =>  isCurrent && `
    transform: scale(1.5); /* Enlarge selected card */
    transition: border 0.3s, transform 0.3s;
    margin: 20px;
  `}

`;


export default Hand;