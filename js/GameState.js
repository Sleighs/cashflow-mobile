import BoardSpaces from "./BoardSpaces";
import Calc from "./Calc";
import Cards from "./Cards";
import Main from "./Main";

var GameState = {
    players: [],
    currentPlayer: 0,
    turnCount: 0,
    playerCount: 1,
    currentGame: null,
    phase: null,
    gamePhase: null,
    moves: [],
    events: ['Welcome to CashFlow Mobile'],
    turnPhase: null,
    midPhaseInfo: null,
    paymentCalc: {
        open: false,
        type: null
    },
};

GameState.rollDie = (rollType)=>{
    var num = Math.floor(Math.random() * 6) + 1;
    
    if (rollType === 'double'){
        num = num * 2;
    }

    var text = 'You rolled a ' + num;
    
    GameState.events.push(text);

    return num;
}

GameState.checkOccupiedSpaces = (space)=>{
    if (space.players.length > 0){
        return true
    } else {
        return false
    }
}

GameState.getInsuranceCost = (currentPlayer) => {
    const player = GameState.players[currentPlayer]
    var childTax = 0;
    var insuranceCost = 0;

    if (!player.hasInsurance){
        return insuranceCost
    } else {
        if (player.children > 0) {
            childTax = player.chldren * .01
        }
    
        insuranceCost = player.payday * (.08 + childTax)

        return Math.floor(insuranceCost)
    }
}


export default GameState