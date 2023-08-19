import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from './Card';
import handlePassRound from './HandlePassRound';
import Modal from './Modal';


const Hand = ({activePlayer, setActivePlayer}) => {

    const [activePlayerSelectedCard, setActivePlayerSelectedCard] = useState(null);
    const [isRoundOverModal, setIsRoundOverModal] = useState(false);
    const [message, setMessage] = useState("This is space for a dynamic game message");
    const [status, setStatus] = useState("This is space for a dynamic game status");

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
              handlePassRound(event, activePlayer, setActivePlayer, setIsRoundOverModal, setStatus, setMessage);
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
              console.log(roundOverResponse.data.status);
              if (roundOverResponse.data.status === true) {
                console.log("The round is over");
                setMessage(roundOverResponse.data.message)
                setStatus("Round Over!");
                setIsRoundOverModal(true); // Open the modal

      
                try {
                  const gameOverResponse = await axios.get('http://localhost:8080/api/gamestate/isGameOver');
                  console.log(gameOverResponse.data.status);
                  if (gameOverResponse.data.status === true) {
                    console.log("The game is over");
                    setMessage(gameOverResponse.data.message)
                    setStatus("Game Over!");
                    setIsRoundOverModal(true); // Open the modal

                    
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
                <HandWrapper>
                    <PlayerPrompt>{activePlayer.name + ": " + "Choose your Card!"}</PlayerPrompt>
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
                  </HandContainer>
                </HandWrapper>
                <Modal isOpen={isRoundOverModal} onClose={() => setIsRoundOverModal(false)} status={status} message={message} />

                
        </>
     );
}




const Button = styled.input`
margin-top: 10px;
`;

const HandWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  align-items: center; /* Center horizontally */
  gap: 10px;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.5) 40%,
    rgba(0, 0, 0, 0.2) 100%
  ), rgba(77, 44, 18, 0.9);
`;

const HandContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding-bottom: 20px;
`;

const CardContainer = styled.div`
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column; /* Change to 'column' for card content alignment */
  ${({ isCurrent }) =>
    isCurrent &&
    `
    transform: scale(1.5);
    transition: border 0.3s, transform 0.3s;
    margin: 20px;
  `}
`;

const PlayerPrompt = styled.h2`
  text-align: center;
  margin: 10px;
  padding: 0;
  color: gold;
`;


export default Hand;