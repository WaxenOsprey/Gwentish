import axios from 'axios';

    const handlePassRound = async (e, activePlayer, setActivePlayer, setIsRoundOverModal, setStatus, setMessage) => {

        
        e.preventDefault();
        try {
          const passResponse = await axios.get('http://localhost:8080/api/gamestate/passRound');
          console.log(passResponse.data);
          console.log(activePlayer.name + " Has passed the round");
      
          try {
            const roundOverResponse = await axios.get('http://localhost:8080/api/gamestate/isRoundOver');
            console.log(roundOverResponse.data.status);
            if (roundOverResponse.data.status === true) {
              console.log("The round is over");
              setMessage(roundOverResponse.data.message)
              setStatus("Round Over!");
              setIsRoundOverModal(true); // Open the modal
      
              try {
                const gameOverResponse = await axios.get('http://localhost:8080/api/gamestate/isGameOver');
                console.log(gameOverResponse.data.status);
                if (gameOverResponse.data.status === true) {
                  console.log("The game is over");
                  setMessage(gameOverResponse.data.message)
                  setStatus("Game Over!");
                  setIsRoundOverModal(true); // Open the modal
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