import axios from 'axios';

    const handlePassRound = async (e, activePlayer, setActivePlayer) => {
        e.preventDefault();
        try {
          const passResponse = await axios.get('http://localhost:8080/api/gamestate/passRound');
          console.log(passResponse.data);
          console.log(activePlayer.name + " Has passed the round");
      
          try {
            const roundOverResponse = await axios.get('http://localhost:8080/api/gamestate/isRoundOver');
            console.log(roundOverResponse.data);
            if (roundOverResponse.data === true) {
              console.log("The round is over");
              alert("The Round is Over!")
      
              try {
                const gameOverResponse = await axios.get('http://localhost:8080/api/gamestate/isGameOver');
                console.log(gameOverResponse.data);
                if (gameOverResponse.data === true) {
                  console.log("The game is over");
                  alert("The Game is Over!")
                  // Perform actions for game over
                } else {
                  console.log("The game is not over");
                  const toggleResponse = await axios.get('http://localhost:8080/api/gamestate/togglePlayer');
                  console.log(toggleResponse.data);
                  setActivePlayer(toggleResponse.data);
                }
              } catch (error) {
                console.error(error);
              }
            } else {
              console.log("The round is not over");
              const toggleResponse = await axios.get('http://localhost:8080/api/gamestate/togglePlayer');
              console.log(toggleResponse.data);
              setActivePlayer(toggleResponse.data);
            }
          } catch (error) {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
        }
      };
 
export default handlePassRound;