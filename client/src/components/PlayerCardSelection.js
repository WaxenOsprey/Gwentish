import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from "styled-components";
import Card from "./Card";
import handlePassRound from './HandlePassRound';


  const PlayerCardSelection = ({ activePlayer, setActivePlayer }) => {
    const [activePlayerSelectedHand, setActivePlayerSelectedHand] = useState([]);
    const [activePlayerSelectedCard, setActivePlayerSelectedCard] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);


    useEffect(() => {
      const handleKeyPress = (e) => {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            if (activePlayer.hand.length >= 1) {
              const currentIndex = activePlayer.hand.findIndex(card => activePlayerSelectedCard && activePlayerSelectedCard.id === card.id);
              const previousIndex = (currentIndex - 1 + activePlayer.hand.length) % activePlayer.hand.length;
              setActivePlayerSelectedCard(activePlayer.hand[previousIndex]);
            }
            break;
          
          case "ArrowRight":
            e.preventDefault();
            if (activePlayer.hand.length >= 1) {
              const currentIndex = activePlayer.hand.findIndex(card => activePlayerSelectedCard && activePlayerSelectedCard.id === card.id);
              const nextIndex = (currentIndex + 1) % activePlayer.hand.length;
              setActivePlayerSelectedCard(activePlayer.hand[nextIndex]);
            }
            break;
          
          case "Enter":
            if (activePlayerSelectedCard) {
              handleChosenCardSubmission(e);
            } else if (activePlayer.hand.length === 0) {
              handleHandSubmit(e);
            }
            break;
          
          case " ":
            if (activePlayer.hand.length > 1) {
              handlePassRound(e, activePlayer, setActivePlayer);
            }
            break;
    
          default:
            break;
        }
      };
    
      document.addEventListener("keydown", handleKeyPress);
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }, [activePlayerSelectedCard, activePlayer.hand.length]);
    
    
    

    // Choosing hand from deck

    const handleClick = (card, name, power) => {
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

    // Choosing card from hand 

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
      

    const handleCardMouseEnter = (card) => {
      setHoveredCard(card);
    };

    const handleCardMouseLeave = () => {
      setHoveredCard(null);
    };

    return (
      <Wrapper>
        {activePlayer && (
          <Heading>Choosing cards for Player: {activePlayer.name}</Heading>
        )}
        <CardGrid>
          {activePlayer && activePlayer.hand && (
            <FlexContainer>
              {activePlayer.hand.length >= 1 ? (
                <>
                  {activePlayer.hand.map((card) => (
                    <CardContainer
                      key={card.id}
                      className={`card ${activePlayerSelectedCard && activePlayerSelectedCard.id === card.id ? 'selected' : ''}`}
                      onClick={() => handleChosenCardClick(card, card.name, card.power)}
                      onMouseEnter={() => handleCardMouseEnter(card)}
                      onMouseLeave={handleCardMouseLeave}
                    >
                      <Card card={card} />
                      {hoveredCard && hoveredCard.id === card.id && (
                        <FlavorText>{card.flavor}</FlavorText>
                      )}
                    </CardContainer>
                  ))}
                  <form onSubmit={handleChosenCardSubmission}>
                    <Button type="submit" value="Submit" />
                  </form>
                </>
              ) : (
                <>
                  {activePlayer.deck.map((card) => (
                    <CardContainer
                      key={card.id}
                      className={`card ${activePlayerSelectedHand.some((selectedCard) => selectedCard.id === card.id) ? 'selected' : ''}`}
                      onClick={() => handleClick(card, card.name, card.power)}
                      onMouseEnter={() => handleCardMouseEnter(card)}
                      onMouseLeave={handleCardMouseLeave}
                    >
                      <Card card={card} />
                      {hoveredCard && hoveredCard.id === card.id && (
                        <FlavorText>{card.flavor}</FlavorText>
                      )}
                    </CardContainer>
                  ))}
                  <form onSubmit={handleHandSubmit}>
                    <Button type="submit" value="Submit" />
                  </form>
                </>
              )}
              {activePlayer.hand.length > 1 && (
                <form onSubmit={(e) => handlePassRound(e, activePlayer, setActivePlayer)}>
                  <Button type="submit" value="Pass Round" />
                </form>
              )}
            </FlexContainer>
          )}
        </CardGrid>
      </Wrapper>
    );
  };
  
  const Wrapper = styled.div`
    margin-left: 11.97%;
    margin-right: 11.97%;
  `;
  
  const Heading = styled.h3`
    margin-left: 11.97%;
    margin-right: 11.97%;
    font-family: "Arial", sans-serif;
    font-size: 24px;
    color: #333;
  `;
  
  const CardGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  `;
  
  const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
  `;
  
  const CardContainer = styled.div`
    position: relative;
    padding: 10px;
    cursor: pointer;
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    color: #333;
  
    &.selected,
    &.active {
      background-color: #f1f1f1;
      box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.16);
      border-radius: 10px;
    }
  
    &:hover .flavor-text {
      visibility: visible;
      opacity: 1;
    }
  `;
  
  const FlavorText = styled.p`
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 14px;
    line-height: 1.4;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.2s;
    pointer-events: none;
    z-index: 100;
  `;
  
  const Button = styled.input`
    margin-top: 10px;
  `;
  
  export default PlayerCardSelection;
