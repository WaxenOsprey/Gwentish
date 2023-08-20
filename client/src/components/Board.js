import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import PlayerInfo from './PlayerInfo';
import siegeIcon from '../icons/catapult.png';
import rangeIcon from '../icons/bow.png';
import meleeIcon from '../icons/sword.png';
import ControlPanel from './ControlPanel';

const Board = ({ activePlayer, listOf2Players, setListOf2Players }) => {
  const [board, setBoard] = useState(null);

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
  let listofPlayersCards = [];

  if (listOf2Players && Object.keys(listOf2Players).length !== 0) {
    listofPlayersLives = listOf2Players.map((playerObj) => {
      return playerObj.lives;
    });
    listofPlayersNames = listOf2Players.map((playerObj) => {
      return playerObj.name;
    });
    listofPlayersCards = listOf2Players.map((playerObj) => {
      return playerObj.hand.length;
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

  const player1CardCount = listofPlayersCards[0];
  const player2CardCount = listofPlayersCards[1];

  const player1HasPassed = listOf2Players[0].hasPassed;
  const player2HasPassed = listOf2Players[1].hasPassed;




  return (
    <>
    <BoardWrapper className="Board">
      <PlayerInfoWrapperBackground className="player-info">
        <PlayerInfo playerScore={player1scores.Total} playerName={player1Name} playerLives={player1Lives} player={"player1"} playerCardCount={player1CardCount} playerHasPassed={player1HasPassed}/>
        <ControlPanel/>
        <PlayerInfo playerScore={player2scores.Total} playerName={player2Name} playerLives={player2Lives} player={"player2"} playerCardCount={player2CardCount} playerHasPassed={player2HasPassed}/>
      </PlayerInfoWrapperBackground>
  
      <BoardContentWrapper className="board-content">
        <RankContainer className="p1-rank" rankType="siege">
          <RankScore className="p1-score">{player1scores.Siege}</RankScore>
          <CardContainer className="card-container">
            {player1Cards.Siege.map((card, index) => (
              <Card key={index} card={card} />
              ))}
          </CardContainer>
        </RankContainer>
        <RankContainer className="p1-rank" rankType="range">
          <RankScore className="p1-score">{player1scores.Range}</RankScore>
          <CardContainer className="card-container">
            {player1Cards.Range.map((card, index) => (
              <Card key={index} card={card} />
              ))}
          </CardContainer>
        </RankContainer>
        <RankContainer className="p1-rank" rankType="melee">
          <RankScore className="p1-score">{player1scores.Melee}</RankScore>
          <CardContainer className="card-container">
            {player1Cards.Melee.map((card, index) => (
              <Card key={index} card={card} />
              ))}
          </CardContainer>
        </RankContainer>

        <Breakline></Breakline>

        <RankContainer className="p2-rank" rankType="melee">
          <RankScore className="p2-score">{player2scores.Melee}</RankScore>
          <CardContainer className="card-container">
            {player2Cards.Melee.map((card, index) => (
              <Card key={index} card={card} />
              ))}
          </CardContainer>
        </RankContainer>
        <RankContainer className="p2-rank" rankType="range">
          <RankScore className="p2-score">{player2scores.Range}</RankScore>
          <CardContainer className="card-container">
            {player2Cards.Range.map((card, index) => (
              <Card key={index} card={card} />
              ))}
          </CardContainer>
        </RankContainer>
        <RankContainer className="p2-rank" rankType="siege">
          <RankScore className="p2-score">{player2scores.Siege}</RankScore>
          <CardContainer className="card-container">
            {player2Cards.Siege.map((card, index) => (
              <Card key={index} card={card} />
              ))}
          </CardContainer>
        </RankContainer>
      </BoardContentWrapper>
    </BoardWrapper>
    <BorderDiv></BorderDiv>
    </>
  );
  
};

const BoardWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 2%;
  margin-bottom: 2%;
  flex-direction: row;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.5) 40%,
    rgba(0, 0, 0, 0.2) 100%
  ), rgba(77, 44, 18, 0.9); 
`;

const PlayerInfoWrapperBackground = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.3)
  );
`;


const BoardContentWrapper = styled.div`
  width: 75%;
  margin-left: 50px;
  `;

const RankContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  background: linear-gradient(to bottom right, rgba(101, 67, 33, 0.3), rgba(101, 67, 33, 0.2));
  height: 140px;
  margin: 10px;
  padding-left: 20px;
  border: 3px solid rgba(101, 67, 33, 0.8);
  border-left: 10px solid silver;
  position: relative;

  &::before {
    content: '';
    background-image: ${props =>
      props.rankType === 'melee' ? `url(${meleeIcon})` :
      props.rankType === 'range' ? `url(${rangeIcon})` :
      props.rankType === 'siege' ? `url(${siegeIcon})` : 'none'};
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%; 
    transform: translate(-50%, -50%);
  }
`;



const RankScore = styled.h3`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 10px;
  border: 3px solid black;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  line-height: 50px;
  position: absolute; 
  left: -50px; 
  background-color: ${(props) =>
    props.className === 'p1-score' ? 'rgba(131, 238, 247, 0.9)' : 'rgba(170, 102, 242, 0.9)'};
`;


const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const BorderDiv = styled.div`
  border-bottom: 3px solid black;
`;

const Breakline = styled.div`
  width: 100%;
  height: 5px;
  background-color: rgb(38, 38, 36);
  border-top: 2px solid rgb(117, 113, 90);
  border-radius: 5px
`;


export default Board;
