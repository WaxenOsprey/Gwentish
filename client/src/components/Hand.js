import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from './Card';
import handlePassRound from './HandlePassRound';
import Modal from './Modal';
import handleChosenCardSubmission from './HandlePlayUnitCard';


const Hand = ({activePlayer, setActivePlayer, listOf2Players}) => {

    const [activePlayerSelectedCard, setActivePlayerSelectedCard] = useState(null);
    const [isRoundOverModal, setIsRoundOverModal] = useState(false);
    const [message, setMessage] = useState("This is space for a dynamic game message");
    const [status, setStatus] = useState("This is space for a dynamic game status");
    const [cardInfoPanel, setCardInfoPanel] = useState(false);

    useEffect(() => {
      console.log('activePlayerSelectedCard changed:', activePlayerSelectedCard);
    }, [activePlayerSelectedCard]);

    useEffect(() => {
      console.log('listOf2Players:', listOf2Players);
      console.log(listOf2Players[0].name);
  }, [listOf2Players]);
    

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
              // event.preventDefault();
              handleChosenCardSubmissionWrapper(event);
              break;
            case ' ':
              // event.preventDefault();
              handlePassRound(event, activePlayer, setActivePlayer, setIsRoundOverModal, setStatus, setMessage);
              break;
            case 'i':
              event.preventDefault();
              handleCardInfoToggle(event, activePlayerSelectedCard);
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

    const handleChosenCardSubmissionWrapper = (event) => {
      event.preventDefault();    
      handleChosenCardSubmission(activePlayerSelectedCard, setActivePlayer, setIsRoundOverModal, setMessage, setStatus);

      if (listOf2Players[0].name === activePlayer.name) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {

          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 2000);
      }

    };

    const handleCardInfoToggle = (event) => {
      event.preventDefault();
      setActivePlayerSelectedCard(null); // Deselect the active card when toggling the info panel
      setCardInfoPanel(!cardInfoPanel);
      console.log('Card info panel toggled', cardInfoPanel);
    };
    
    
    

    return (
      <>
        {!isRoundOverModal && ( 
          <HandWrapper>
            <PlayerPrompt>{activePlayer.name + ': ' + 'Choose your Card!'}</PlayerPrompt>
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
            {cardInfoPanel && activePlayerSelectedCard && (
              <CardExtraInfoContainer activePlayerSelectedCard={activePlayerSelectedCard}>
                <ExtraName>{activePlayerSelectedCard.name}</ExtraName>
                <ExtraRarity rarity={activePlayerSelectedCard.rarity}>{"("}{activePlayerSelectedCard.rarity}{")"}</ExtraRarity>
                <ExtraFlavor>{'"'}{activePlayerSelectedCard.flavor}{'"'}</ExtraFlavor>
              </CardExtraInfoContainer>
            )}
          </HandWrapper>
        )}
        <Modal isOpen={isRoundOverModal} onClose={() => setIsRoundOverModal(false)} status={status} message={message} />
      </>
    );
    
}


const ExtraName = styled.h3`
  margin: 5px;
  padding: 0;
  color: brown;
`;

const ExtraRarity = styled.h4`
  margin: 5px;
  padding: 0;
  color:     
    ${props =>
      props.rarity === 'Legendary' ? '#3498db' : 
      props.rarity === 'Epic' ? '#FF69B4' : 
      props.rarity === 'Rare' ? '#FFD700' : 
      props.rarity === 'Common' ? '#C0C0C0' : 'transparent'};
`;

const ExtraFlavor = styled.p`
  margin: 5px;
  padding: 0;
  color: lightseagreen;
  font-style: italic;
`;

const CardExtraInfoContainer = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: darkgoldenrod;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;




const Button = styled.input`
margin-top: 10px;
`;

const HandWrapper = styled.div`
  position: sticky;
  z-index: 2;
  bottom: 0;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  gap: 10px;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.5) 40%,
    rgba(0, 0, 0, 0.2) 100%
  ), rgba(77, 44, 18, 0.5);
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
  flex-direction: column; 
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
  padding: 0;
  color: gold;
`;


export default Hand;