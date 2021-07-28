import GameState from "./GameState";

// Set for single player
var CurrentPlayer = GameState.players[0];

function getCurrentPlayer(){
    if (GameState.players.length > 0){
      return GameState.players[0];
    }
}

CurrentPlayer = getCurrentPlayer();

console.log(CurrentPlayer)
export default CurrentPlayer