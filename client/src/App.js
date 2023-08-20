import './App.css';
import styled from 'styled-components';
import Board from './components/Board';
import StartGame from './components/StartGame';
import Header from './components/Header';
import React, { useState } from "react";
import Hand from './components/Hand';
import Deck from './components/Deck';
import BackgroundMusic from './components/BackgroundMusic'; // Import BackgroundMusic

function App() {
  const [activePlayer, setActivePlayer] = useState(null);
  const [playersSubmitted, setPlayersSubmitted] = useState(false); 
  const [newPlayers, setNewPlayers] = useState([]);
  const [listOf2Players, setListOf2Players] = useState(null);
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false); // Track background music state

  const handlePlayersSubmitted = () => {
    setPlayersSubmitted(true);
  };

  const toggleBackgroundMusic = () => {
    setIsBackgroundMusicPlaying(!isBackgroundMusicPlaying);
  };

  return (
    <>
      {playersSubmitted ? (
        <>
          {isBackgroundMusicPlaying && <BackgroundMusic togglePlay={toggleBackgroundMusic} />}
          <Header />
          <Board activePlayer={activePlayer} listOf2Players={listOf2Players} setListOf2Players={setListOf2Players} />
          {activePlayer && activePlayer.hand && activePlayer.hand.length >= 1 ? (
            <Hand activePlayer={activePlayer} setActivePlayer={setActivePlayer} listOf2Players={listOf2Players}/>
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
          toggleBackgroundMusic={toggleBackgroundMusic}        />
      )}
    </>
  );
}

export default App;
