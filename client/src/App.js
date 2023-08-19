import './App.css';
import Board from './components/Board';
import StartGame from './components/StartGame';
import Header from './components/Header';
import React, { useState } from "react";
import BackgroundMusic from './components/BackgroundMusic';
import Hand from './components/Hand';
import Deck from './components/Deck';

function App() {
  const [activePlayer, setActivePlayer] = useState(null);
  const [playersSubmitted, setPlayersSubmitted] = useState(false); 
  const [newPlayers, setNewPlayers] = useState([]);
  const [listOf2Players, setListOf2Players] = useState(null);

  const handlePlayersSubmitted = () => {
    setPlayersSubmitted(true);
  };

  return (
    <>
      {playersSubmitted ? (
        <>
          <Header />
          <Board activePlayer={activePlayer} listOf2Players={listOf2Players} setListOf2Players={setListOf2Players} />
          {activePlayer && activePlayer.hand && activePlayer.hand.length >= 1 ? (
            <Hand activePlayer={activePlayer} setActivePlayer={setActivePlayer}/>
          ) : (
            <Deck activePlayer={activePlayer} setActivePlayer={setActivePlayer}/>
          )}
        </>
      ) : (
        
        <StartGame
          newPlayers={newPlayers}
          setNewPlayers={setNewPlayers}
          setActivePlayer={setActivePlayer}
          onPlayersSubmitted={handlePlayersSubmitted}
          backgroundMusic={<BackgroundMusic />}
        />
      )}
    </>
  );
}

export default App;
