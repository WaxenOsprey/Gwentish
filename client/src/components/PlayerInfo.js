import React from 'react';
import styled from 'styled-components';
import CardsIconUrl from '../icons/cardsIcon.png';
import RedGemIcon from '../icons/redGem.png';
import EmptyGemIcon from '../icons/emptyGem.png';
import ProfilePicture from '../icons/player1.png'



const PlayerInfo = ({ playerScore, playerName, playerLives, player, playerCardCount, playerHasPassed, listOf2Players}) => {
  return (
    <PlayerInfoWrapper>
      <ProfileNamePicContainer>
        <ProfilePic src={ProfilePicture} alt="Profile Picture" playerName={playerName} listOf2Players={listOf2Players}/>
      </ProfileNamePicContainer>
      <PlayerInfoContainer>
        <NameAndPassedContainer> 
          <PlayerName>{playerName}</PlayerName>
          {playerHasPassed && <PassedRoundIndicator>Passed!</PassedRoundIndicator>}
        </NameAndPassedContainer>
        

        <SeparatorLine />

        <LivesAndCardCount title={`Player Cards Remaining: ${playerCardCount}`} alt="Player Card Counter">
          <StyledCardsIcon />
          <PlayerCardCounter >{playerCardCount}</PlayerCardCounter>
          <LivesContainer>
            <GemIcon src={playerLives > 0 ? RedGemIcon : EmptyGemIcon} alt="Lives" title={`Player Lives: ${playerLives}`} />
            <GemIcon src={playerLives > 1 ? RedGemIcon : EmptyGemIcon} alt="Lives" title={`Player Lives: ${playerLives}`} />
          </LivesContainer>
        </LivesAndCardCount>
      </PlayerInfoContainer>
      <PlayerTotalScore player={player} alt="Player Score" >{playerScore} </PlayerTotalScore>
    </PlayerInfoWrapper>
  );
};



const CardsIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  margin: 0;
  padding: 0;
`;

const NameAndPassedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  `

const StyledCardsIcon = styled.div`
  height: 25px;
  width: 25px;
  padding: 10px;
  background-image: url(${CardsIconUrl});
  background-size: cover;
  background-repeat: no-repeat;
  filter: sepia(100%) saturate(500%) hue-rotate(40deg); /* Apply gold color effect */

`;


const PlayerInfoWrapper = styled.div`
  background-color: rgb(76, 46, 20, 0.7);
  display: flex;
  align-items: center;
  justify-content: space-between; /* Center horizontally */
  width: 90%;
  height: 100px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 20px;
`;

const ProfileNamePicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const ProfilePic = styled.img`
  border: 5px solid black;
  border-radius: 50%;
  width: 100%;
  height: 75%;
  margin-top: 10px;
  padding: 0;
  border-color: ${(props) => (props.listOf2Players && props.listOf2Players[0]) ? (props.playerName === props.listOf2Players[0].name ? 'lightseagreen' : 'rgb(170, 102, 242)') : 'rgb(170, 102, 242)'};
`;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 75%; 
  height: 100%;
  margin: 0 10px;
  padding: 0 10px;
`;

const PlayerName = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: rgb(175, 139, 81);
  margin-right: 20px;
  padding: 0;
`;

const SeparatorLine = styled.div`
  width: 100%;
  border-top: 2px solid gold; 
  margin: 5px 0; 
  margin-top: 25px;

`;

const LivesAndCardCount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LivesContainer = styled.div`
  height: 50px;
  width: 50px;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  padding: 0;
`;

const GemIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 4px;
`;

const PlayerCardCounter = styled.div`
  font-size: 32px;
  font-weight: bold;
  padding: 0;
  margin-right: 70px;
`;

const PlayerTotalScore = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  border: 3px solid black;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 26.5%;
  background-color: ${(props) =>
    props.player === 'player1' ? 'rgb(131, 238, 247, 0.9)' : 'rgb(170, 102, 242, 0.9)'};
`;

const PassedRoundIndicator = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export default PlayerInfo;