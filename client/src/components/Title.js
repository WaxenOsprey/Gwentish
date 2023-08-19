import React from 'react';
import styled from 'styled-components';
import PR_Viking from '../fonts/pr_viking/PR Viking.ttf'


const Title = () => {
  return (
    <BigTitle>
      GWENTISH!
    </BigTitle>
  );
};


const BigTitle = styled.h1` 
font-family: 'PR Viking', sans-serif;
font-size: 72px;
font-weight: bold;
text-transform: uppercase;
color: rgb(7, 77, 15); 
text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;
margin: 10px;
`;


export default Title;
