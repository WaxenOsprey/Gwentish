const Header = ({ startGameComponent }) => {
    return (
      <div className="header-container">
        <h1 className="header-title">GWENTISH!</h1>
        {startGameComponent}
      </div>
    );
  };
  
 
export default Header;