import BoardSpaces from "./BoardSpaces";
import Cards from "./Cards";

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

GameState.movePlayer = (moveType) => {
    // Roll dice
    var dice = GameState.rollDie(moveType);
    GameState.diceAmount = dice;

    // Get original player location
    var player = GameState.players[GameState.currentPlayer];

    // Get new space location
    var newSpace ; 
    if ( player.currentSpace + dice > 24 ){
        newSpace = player.currentSpace + dice - 24
    } else {
        newSpace = player.currentSpace + dice
    }
    
    // If pass paycheck get payday - currently set to salary
    if (player.currentSpace < 5 && newSpace >= 5) {
        player.cash += player.payday;
    } else if (player.currentSpace < 13 && newSpace >= 13) {
        player.cash += player.payday;
    } else if (player.currentSpace < 21 && newSpace + dice >= 21) {
        player.cash += player.payday;
    }

    

    // Remove player from old space
    const index = BoardSpaces[player.currentSpace - 1].players.indexOf(player.name);
    
    if (index > -1) {
        BoardSpaces[player.currentSpace - 1].players.splice(index, 1);
    }

    // Add player to new space
    BoardSpaces[newSpace - 1].players.push(player.name);

    // Update current player space
    player.currentSpace = newSpace;

    // Set moved to true to mark the move is over
    player.moved = true;

    // Switch to next phase
    GameState.turnPhase = 'middle';

    // Get space details
    var space = BoardSpaces[player.currentSpace - 1];

    //get space type 
        /* 
        child
        doodad
        payday
        downsize
        offer
        opportunity
        charity
         */
    
    // Constructor for displaying the middle turn phase
    function midPhaseInfo (
        title, 
        description1,
        description2,
        description3,
        cost
    ) {
        this.title = title;
        this.description1 = description1;
        this.description2 = description2;
        this.description3 = description3;
        this.cost = cost;
    };

    var info;

    // Arrange display info for component
    switch(space.field){
        case 'OPPORTUNITY':
            info = new midPhaseInfo(
                'DEAL OPPORTUNITY',
                'Which type of deal do you want?',
                'Small deals cost $5,000 or less.',
                'Big deals cost $6,000 or more.',
                ''
            )
            break;
        case 'DOODAD':
            GameState.getDoodad();
            info = new midPhaseInfo(
                GameState.currentDoodad.name,
                GameState.currentDoodad.text,
                '',
                '',
                ''
            )
            break;
        case 'OFFER':
            GameState.getOffer();
            var offer = !GameState.currentOffer.offer ? (!GameState.currentOffer.offerPerUnit ? '' : ("Offer per unit: $" + GameState.currentOffer.offerPerUnit)) : ("Offer: $" + GameState.currentOffer.offer);
            
            info = new midPhaseInfo(
                GameState.currentOffer.name,
                GameState.currentOffer.description,
                GameState.currentOffer.rule1,
                GameState.currentOffer.rule2,
                offer
            )
            break;
        case 'CHARITY':
            info = new midPhaseInfo(
                'GIVE TO CHARITY',
                'Donate 10% of your total income to roll 1 or 2 die over your next 3 turns.',
                '',
                '',
                ''
            )
            break;
        case 'PAYDAY':
            info = new midPhaseInfo(
                'PAYDAY',
                //'You\'ve made $' + player.payday + ' this pay period.',
                '', 
                '', 
                '',
                ''
            )
            break;
        case 'CHILD':
            //calculate and add expenses
            info = new midPhaseInfo(
                'CONGRATULATIONS',
                'You welcome a new child into your home!',
                '',
                '',
                ''

            )
            break;
        case 'DOWNSIZE':
            var insured = '';

            if (player.hasInsurance === true) {
                insured = 'You are covered for the full amount of $' + player.payday;
            }

            info = new midPhaseInfo(
                'DOWNSIZED!',
                'Pay a full set of your expenses. Skip 3 turns.',
                insured,
                '',
                ''

            ) 
            break;
    }
    
    GameState.midPhaseInfo = info;

    console.log('move info', {
        dice: dice,
        prevSpace: player.currentSpace,
        newSpace: newSpace,
        boardSpace: BoardSpaces[player.currentSpace - 1],
        midPhaseInfo: info,
    })
}

GameState.endTurn = () => {
    if ((GameState.currentPlayer + 1) === GameState.playerCount) {
        GameState.turnCount++;
    } else {
        GameState.currentPlayer++;
    }

    GameState.turnPhase = "roll";
}

GameState.checkOccupiedSpaces = (space)=>{
    if (space.players.length > 0){
        return true
    } else {
        return false
    }
}

GameState.getDoodad = () => {
    var player = GameState.players[GameState.currentPlayer];
    var keys = Object.keys(Cards.doodad);
    var randDoodad = function(object) {
        return object[keys[Math.floor(keys.length * Math.random())]];
    };
    var doodad = randDoodad(Cards.doodad);

    //check if doodad requires children
    if (doodad.child == true && player.children == 0) {
        //get new doodad
        GameState.getDoodad();
    } else {
        GameState.currentDoodad = doodad;
    }
    

}

GameState.getOffer = () => {
    var player = GameState.players[GameState.currentPlayer];

    var obj = Cards.offer;
    var keys = Object.keys(obj);
    var randOffer = function(object) {
        return object[keys[Math.floor(keys.length * Math.random())]];
    };
    var currentOffer = randOffer(obj);

    GameState.currentOffer = currentOffer;

    console.log('current offer', GameState.currentOffer)

}   

export default GameState