import './App.css';
import styled from 'styled-components';
import Board from './components/Board';
import StartGame from './components/StartGame';
import Header from './components/Header';
import React, { useEffect, useState } from "react";
import Hand from './components/Hand';
import Deck from './components/Deck';
import BackgroundMusic from './components/BackgroundMusic'; // Import BackgroundMusic


function App() {
  const [activePlayer, setActivePlayer] = useState(null);
  const [playersSubmitted, setPlayersSubmitted] = useState(false); 
  const [newPlayers, setNewPlayers] = useState([]);
  const [listOf2Players, setListOf2Players] = useState(null);
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false); // Track background music state

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "m") {
        toggleBackgroundMusic();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []); 

  const toggleBackgroundMusic = () => {
    setIsBackgroundMusicPlaying(!isBackgroundMusicPlaying);
  };

  const handlePlayersSubmitted = () => {
    setPlayersSubmitted(true);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100); 

  };



  return (
    <>
      {playersSubmitted ? (
        <>
          <Header />
          <Board activePlayer={activePlayer} listOf2Players={listOf2Players} setListOf2Players={setListOf2Players} />
          {activePlayer && activePlayer.hand && activePlayer.hand.length >= 1 ? (
            <Hand activePlayer={activePlayer} setActivePlayer={setActivePlayer} listOf2Players={listOf2Players}/>
          ) : (
            <Deck activePlayer={activePlayer} setActivePlayer={setActivePlayer} listOf2Players={listOf2Players}/>
          )}
        </>
      ) : (
        <StartGame
          newPlayers={newPlayers}
          setNewPlayers={setNewPlayers}
          setActivePlayer={setActivePlayer}
          onPlayersSubmitted={handlePlayersSubmitted}
          toggleBackgroundMusic={toggleBackgroundMusic} // Pass toggleBackgroundMusic function as prop
          isBackgroundMusicPlaying={isBackgroundMusicPlaying} // Pass isBackgroundMusicPlaying state as prop
          setIsBackgroundMusicPlaying={setIsBackgroundMusicPlaying} // Pass setIsBackgroundMusicPlaying function as prop
          />
      )}
    </>
  );
}

export default App;
