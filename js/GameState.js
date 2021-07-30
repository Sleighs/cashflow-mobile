var GameState = {
    players: [],
    currentPlayer: 0,
    turnCount: 0,
    playerCount: 1,
    currentGame: null,
    phase: null,
    gamePhase: null,
    moves: [],
    event: ['Welcome to CashFlow Mobile'],
    turnPhase: null,

    turnPhase: null, //roll, card, end
};

GameState.endTurn = () => {
    if ((GameState.currentPlayer + 1) === GameState.playerCount) {
        GameState.turnCount++;
    } else {
        GameState.currentPlayer++;
    }

    GameState.turnPhase = "roll";
}

export default GameState