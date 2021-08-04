import { useDispatch, useSelector } from 'react-redux'
import { getGameData } from '../redux/reducers/rootReducer';

import BoardSpaces from "./BoardSpaces";
import CardDeck from "./Cards";
import GameState from "./GameState";

var Main = {
    movePlayer: function(moveType) {
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
        function midPhaseInfo(
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
                Main.getDoodad();
                info = new midPhaseInfo(
                    GameState.currentDoodad.name,
                    GameState.currentDoodad.text,
                    '',
                    '',
                    ''
                )
                break;
            case 'OFFER':
                Main.getOffer();
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
                player.children += 1;
    
                var expense = Math.round(player.totalIncome * 0.056)
    
                player.childExpense = expense;
                
                console.log('children', expense, player.children)
    
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
    },
    endTurn: function() {
        if ((GameState.currentPlayer + 1) === GameState.playerCount) {
            GameState.turnCount++;
        } else {
            GameState.currentPlayer++;
        }
    
        GameState.turnPhase = "roll";
    },
    nextTurn: function() {
        var moved = 0;
    
        for (var i = 0; i < GameState.players.length; i++){
            if (GameState.players[i].moved === true){
                moved++
            }
        }
    
        if (moved === GameState.players.length) {
            GameState.turnCount += GameState.turnCount + 1;
            GameState.turnPhase = 'roll';
            GameState.currentPlayer = 0;
    
            for (var j = 0; j < GameState.players.length; j++){
                if (GameState.players[j].moved === true){
                    GameState.players[j].moved = false;
                }
            }
        }
    
        
    },
    getDoodad: function() {
        var player = GameState.players[GameState.currentPlayer];

        var keys = Object.keys(CardDeck.doodad);
        var randDoodad = function(object) {
            return object[keys[Math.floor(keys.length * Math.random())]];
        };
        var doodad = randDoodad(CardDeck.doodad);

        //check if doodad requires children
        if (doodad.child == true && player.children == 0) {
            //get new doodad
            Main.getDoodad();
        } else {
            GameState.currentDoodad = doodad;
        }
    },
    numWithCommas: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getOffer: function() {
        var player = GameState.players[GameState.currentPlayer];

        var obj = CardDeck.offer;
        var keys = Object.keys(obj);
        var randOffer = function(object) {
            return object[keys[Math.floor(keys.length * Math.random())]];
        };
        var currentOffer = randOffer(obj);

        GameState.currentOffer = currentOffer;

        console.log('current offer', GameState.currentOffer)

    },
    getSmallDeal: function() {
        var player = GameState.players[GameState.currentPlayer];

        var obj = CardDeck.smallDeal;
        var keys = Object.keys(obj);
        var randDeal = function(object) {
            return object[keys[Math.floor(keys.length * Math.random())]];
        };

        const currentDeal = randDeal(obj);
        var dealType;

		if (!currentDeal) {
            dealType = "none";
        } else {
			GameState.currentDeal = currentDeal;
			dealType = currentDeal.type;
		}

        console.log('small deal', currentDeal)
    },
    getLargeDeal: function() {
        var player = GameState.players[GameState.currentPlayer];

        var obj = CardDeck.bigDeal;
        var keys = Object.keys(obj);
        var randDeal = function(object) {
            return object[keys[Math.floor(keys.length * Math.random())]];
        };

        const currentDeal = randDeal(obj);
        var dealType;

		if (!currentDeal) {
            dealType = "none";
        } else {
			GameState.currentDeal = currentDeal;
			dealType = currentDeal.type;
		}

        console.log('large deal', currentDeal)
    },
}

export default Main