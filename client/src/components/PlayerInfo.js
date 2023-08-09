import React from 'react';
import styled from 'styled-components';


const PlayerInfo = ({ playerScore, playerName, playerLives, player, playerCardCount}) => {
  return (
    <PlayerInfoWrapper>
      <ProfilePic />
      <PlayerInfoContainer>
        <PlayerName>{playerName}</PlayerName>
        <CardsIconContainer>
          <CardsIcon>{playerCardCount}</CardsIcon>
          <LivesContainer>
            {Array(playerLives).fill(<GemSymbol>💎</GemSymbol>)}
          </LivesContainer>
        </CardsIconContainer>
      </PlayerInfoContainer>
      <PlayerTotalScore player={player}>{playerScore}</PlayerTotalScore>
    </PlayerInfoWrapper>
  );
};

  const PlayerInfoWrapper = styled.div`
    background-color: rgb(76, 46, 20, 0.7);
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
  `;
  
  const ProfilePic = styled.div`
    background-color: rgb(175, 139, 81);
    border: 2px solid black;
    border-radius: 50%;
    width: 50px; 
    height: 50px; 
    margin: 0;
    padding: 0;
  `;
  
  const PlayerInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    height: 100%;
    margin: 0 10px;
    padding: 0 10px;
  `;
  
  const PlayerName = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: rgb(175, 139, 81);
    margin: 0;
    padding: 0;
  `;
  
  const CardsIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
    margin: 0;
    padding: 0;
  `;
  
  const CardsIcon = styled.div`
    height: 50px;
    width: 50px;
    padding: 10px;
    margin-right: 10px;
  
  `;
  
  const LivesContainer = styled.div`
    height: 50px;
    width: 50px;
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
  `;
  
  const GemSymbol = styled.span`
    margin-right: 4px;
  `;
  
  const PlayerTotalScore = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    padding: 0;
    border: 3px solid black;
    border-radius: 50%;
    width: 50px; 
    height: 50px; 
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) =>
      props.player === 'player1' ? 'rgb(118, 226, 201)' : 'rgb(224, 191, 61)'};
  `;
  
export default PlayerInfo;
