import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const handleChosenCardSubmission = async (activePlayerSelectedCard, setActivePlayer, setIsRoundOverModal, setMessage, setStatus) => {
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
            setIsRoundOverModal(true); 

  
            try {
              const gameOverResponse = await axios.get('http://localhost:8080/api/gamestate/isGameOver');
              console.log(gameOverResponse.data.status);
              if (gameOverResponse.data.status === true) {
                console.log("The game is over");
                setMessage(gameOverResponse.data.message)
                setStatus("Game Over!");
                setIsRoundOverModal(true); 

                
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

    export default handleChosenCardSubmission;
