import React, { useState } from "react";
import axios from 'axios';
import styled from 'styled-components';
import Title from './Title';

const StartGame = ({newPlayers, setNewPlayers, setActivePlayer, onPlayersSubmitted, backgroundMusic }) => {
  const [inputtedPlayer, setInputtedPlayer] = useState("");

  const handleNameChange = (e) => {
    setInputtedPlayer(e.target.value);
  };

  const handlePlayersList = (e) => {
    e.preventDefault();
    setInputtedPlayer("");
    setNewPlayers((prevPlayers) => [...prevPlayers, inputtedPlayer]);
  };

  const handleSubmitPlayers = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/game/initialise', newPlayers);
      console.log(response.status);
      console.log("These are the players from game/initialise " + newPlayers);
      if (response.status === 200) {
        try {
          const response = await axios.get('http://localhost:8080/api/gamestate/getActivePlayer');
          console.log(response.data);
          setActivePlayer(response.data);
          setInputtedPlayer("");
          // setNewPlayers([]);
          onPlayersSubmitted(); // Call the callback function to indicate players submission
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="UserNewForm">
      <Title />
      <h1>Enter Player Names</h1>
      <h2>Minimum 2 players</h2>
      <h2>Maximum 2 players</h2>
      
      <form onSubmit={handlePlayersList}>
        <label htmlFor="newPlayerName">Name:</label>
        <input
          type="text"
          id="newPlayerName"
          name="newPlayerName"
          onChange={handleNameChange}
          value={inputtedPlayer}
        />
        <button type="submit">Add Player</button>
      </form>

      <form onSubmit={handleSubmitPlayers}>
        <button type="submit">Start Game!</button>
      </form>
      <ul className="player-list">
        {newPlayers.map((newPlayer, index) => (
          <li key={index}>{newPlayer}</li>
        ))}
      </ul>
    </div>
  );
}

export default StartGame;