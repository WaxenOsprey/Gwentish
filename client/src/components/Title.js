import React from 'react';
import styled, {keyframes} from 'styled-components';
import PR_Viking from '../fonts/pr_viking/PR Viking.ttf'


const Title = () => {
  return (
    <BigTitle>
      GWENTISH!
    </BigTitle>
  );
};


const flash = keyframes`
  0%, 100% {
    color: black;
  }
  50% {
    color: #568203; 
  }
`;

const BigTitle = styled.h1` 
font-family: 'PR Viking', sans-serif;
font-size: 72px;
font-weight: bold;
text-transform: uppercase;
color: #568203; 
text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;
margin: 10px;
animation: ${flash} 4s linear infinite;

`;


export default Title;
