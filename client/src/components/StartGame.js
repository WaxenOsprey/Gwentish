import React, { useState } from "react";
import axios from 'axios';
import styled from 'styled-components';
import Title from './Title';



const StartGame = ({ newPlayers, setNewPlayers, setActivePlayer, onPlayersSubmitted, backgroundMusic }) => {
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
    <Container>
      <Title />
      <EnterPlayers>
        <h1>Enter Player Names</h1>
        <h2>Player no: 2</h2>
      </EnterPlayers>
      
      <Form onSubmit={handlePlayersList}>
        <Label htmlFor="newPlayerName">Name:</Label>
        <Input
          type="text"
          id="newPlayerName"
          name="newPlayerName"
          onChange={handleNameChange}
          value={inputtedPlayer}
        />
        <Button type="submit">Add Player</Button>
      </Form>

      <Form onSubmit={handleSubmitPlayers}>
        <Button type="submit">Start Game!</Button>
      </Form>
      <PlayerList>
        {newPlayers.map((newPlayer, index) => (
          <PlayerListItem key={index}>{newPlayer}</PlayerListItem>
        ))}
      </PlayerList>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-color: rgb(0,0,0, 0.7);
  width: 50%;
  border-radius: 50px;
  border-color: darkgoldenrod;
  border-style: ridge;
  border-width: 5px; 
`;

const EnterPlayers = styled.div`
  margin-bottom: 20px;
  color: darkgoldenrod;
`;

const Form = styled.form`
  margin-top: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: darkgrey;
  width: 50%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: darkgoldenrod;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PlayerListItem = styled.li`
  margin-bottom: 5px;
`;

export default StartGame;
