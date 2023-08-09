import React, { useEffect, useState } from 'react';
import '../components/Board.css';
import Card from './Card';
import PlayerInfo from './PlayerInfo';

const Board = ({ newPlayers, activePlayer }) => {
  const [board, setBoard] = useState(null);
  const [listOf2Players, setListOf2Players] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/gamestate/getBoard')
      .then((res) => res.json())
      .then((boardData) => setBoard(boardData))
      .catch((error) => console.error(error));
  }, [activePlayer]);

  useEffect(() => {
    fetch('http://localhost:8080/api/gamestate/getPlayerList')
      .then((res) => res.json())
      .then((playerObj) => setListOf2Players(playerObj))
      .catch((error) => console.error(error));
  }, [activePlayer]);

  let listofPlayersLives = [];
  let listofPlayersNames = [];

  if (listOf2Players && Object.keys(listOf2Players).length !== 0) {
    listofPlayersLives = listOf2Players.map((playerObj) => {
      return playerObj.lives;
    });
    listofPlayersNames = listOf2Players.map((playerObj) => {
      return playerObj.name;
    });

    console.log('These are the two player lives ', listofPlayersLives);
  }

  if (!board) {
    return <p>Loading...</p>;
  }

  const { player1Cards, player2Cards, player1scores, player2scores } = board;

  const player1Name = listofPlayersNames[0];
  const player2Name = listofPlayersNames[1];

  const player1Lives = listofPlayersLives[0];
  const player2Lives = listofPlayersLives[1];

  

  
  return (
    <div className="Board">
      <div className="player-info">
        <div className="player-score-container">
          <PlayerInfo playerScore={player1scores.Total} playerName={player1Name} playerLives={player1Lives} player={"player1"} />
        </div>

        <div className="player-score-container">
          <PlayerInfo playerScore={player2scores.Total} playerName={player2Name} playerLives={player2Lives} player={"player2"} />
        </div>
      </div>

      <div className="board-content">
        <div className="p1-rank">
          <div className="rank-container">
            <h3>{player1scores.Siege}</h3>
            <div className="card-container">
              {player1Cards.Siege.map((card, index) => (
                <Card key={index} card={card} />
              ))}
            </div>
          </div>
        </div>
        <div className="p1-rank">
          <div className="rank-container">
            <h3>{player1scores.Range}</h3>
            <div className="card-container">
              {player1Cards.Range.map((card, index) => (
                <Card key={index} card={card} />
              ))}
            </div>
          </div>
        </div>
        <div className="p1-rank">
          <div className="rank-container">
            <h3>{player1scores.Melee}</h3>
            <div className="card-container">
              {player1Cards.Melee.map((card, index) => (
                <Card key={index} card={card} />
              ))}
            </div>
          </div>
        </div>
        <div className="p2-rank">
          <div className="rank-container">
            <h3>{player2scores.Melee}</h3>
            <div className="card-container">
              {player2Cards.Melee.map((card, index) => (
                <Card key={index} card={card} />
              ))}
            </div>
          </div>
        </div>
        <div className="p2-rank">
          <div className="rank-container">
            <h3>{player2scores.Range}</h3>
            <div className="card-container">
              {player2Cards.Range.map((card, index) => (
                <Card key={index} card={card} />
              ))}
            </div>
          </div>
        </div>
        <div className="p2-rank">
          <div className="rank-container">
            <h3>{player2scores.Siege}</h3>
            <div className="card-container">
              {player2Cards.Siege.map((card, index) => (
                <Card key={index} card={card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
