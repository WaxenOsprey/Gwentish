import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
    <BoardWrapper className="Board">
      <PlayerInfoWrapper className="player-info">
        <PlayerInfo playerScore={player1scores.Total} playerName={player1Name} playerLives={player1Lives} player={"player1"} />
        <PlayerInfo playerScore={player2scores.Total} playerName={player2Name} playerLives={player2Lives} player={"player2"} />
      </PlayerInfoWrapper>
  
      <BoardContentWrapper className="board-content">
        <RankContainer className="p1-rank">
          <RankHeading>{player1scores.Siege}</RankHeading>
          <CardContainer className="card-container">
            {player1Cards.Siege.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </CardContainer>
        </RankContainer>
        <RankContainer className="p1-rank">
          <RankHeading>{player1scores.Range}</RankHeading>
          <CardContainer className="card-container">
            {player1Cards.Range.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </CardContainer>
        </RankContainer>
        <RankContainer className="p1-rank">
          <RankHeading>{player1scores.Melee}</RankHeading>
          <CardContainer className="card-container">
            {player1Cards.Melee.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </CardContainer>
        </RankContainer>
        <RankContainer className="p2-rank">
          <RankHeading>{player2scores.Melee}</RankHeading>
          <CardContainer className="card-container">
            {player2Cards.Melee.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </CardContainer>
        </RankContainer>
        <RankContainer className="p2-rank">
          <RankHeading>{player2scores.Range}</RankHeading>
          <CardContainer className="card-container">
            {player2Cards.Range.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </CardContainer>
        </RankContainer>
        <RankContainer className="p2-rank">
          <RankHeading>{player2scores.Siege}</RankHeading>
          <CardContainer className="card-container">
            {player2Cards.Siege.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </CardContainer>
        </RankContainer>
      </BoardContentWrapper>
    </BoardWrapper>
  );
  
};

const BoardWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const PlayerInfoWrapper = styled.div`
  width: 25%;
`;

const BoardContentWrapper = styled.div`
  flex-grow: 1;
`;

const RankContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(101, 67, 33, 0.8);
  height: 140px;
  padding: 10px;
  margin: 10px;
`;

const RankHeading = styled.h3`
  text-align: center;
  margin: 0;
  border: 3px solid black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;


export default Board;
