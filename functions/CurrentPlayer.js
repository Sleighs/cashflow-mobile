import GameState from "../js/GameState";

// Set for single player
var CurrentPlayer = GameState.players[0];

export const getCurrentPlayer = () => {
  
  console.log('currentPlayer: ', CurrentPlayer);

    if (GameState.players.length > 0){
      return GameState.players[0];
    }
}

CurrentPlayer = getCurrentPlayer();


export default CurrentPlayer