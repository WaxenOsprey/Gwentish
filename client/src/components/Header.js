import Title from './Title';
import styled from 'styled-components';

const Header = ({ startGameComponent }) => {
    return (
      <HeaderContainer>
        <Title/>
        {startGameComponent}
      </HeaderContainer>
    );
  };
  
  const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
    padding: 0;
    width: 100%;
    height: 50%;
    margin-top: 10px;
    padding: 0;
  `;
 
export default Header;