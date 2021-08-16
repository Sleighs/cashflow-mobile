import GameState from "./GameState";

var Calc = {
    updateStatement: function(currentPlayer) {
        const player = GameState.players[currentPlayer];
    
        /*
        calculate total income
             asset income
             salary
            
    
        calculate total expenses
            loans
            children
            insurance
            taxes
    
        
        total income
        */
       
        let expObj = player.expenses.find((item, i) => {
            if (item.type === 'loans'){
                item.payment = item.cost * .1;
            } 

            return expObj;
        });

        //check loan approval 
        if (player.payday < 0){
            player.loanApproved = false
        } else {
            player.loanApproved = true
        }

        const childCost = Math.round(parseInt(Calc.totalIncome(currentPlayer)) * 0.056);

        player.childExpense = childCost;
    
        player.payday = Calc.totalIncome(currentPlayer) - Calc.totalExpenses(currentPlayer)
    
    },
    totalIncome: function(currentPlayer) {
        const player = GameState.players[currentPlayer];
        var income = 0;

        // get total income <('.'<)
        income += player.startingSalary;

        player.totalIncome = income;
    
        return income;
    },
    totalExpenses: function(currentPlayer) {
        const player = GameState.players[currentPlayer];
        
        //player.expenses
        var newExpenses = 0;

        let obj = player.expenses.find((item, i) => {
            // If fully paid remove from array
            if (item){
                newExpenses += item.payment
            }
            return obj;
        });

        var expenses = 
            newExpenses +
            player.taxes +
            player.otherExpenses + 
            player.childExpense + 
            GameState.getInsuranceCost(currentPlayer);

        player.totalExpenses = expenses;

        return expenses;
    },
    getTaxes: function(currentPlayer) {
        //based on 2019 United States federal income tax brackets
        var player = GameState.players[currentPlayer]
        var taxes = player.taxes;
        var totalIncome = Calc.totalIncome(currentPlayer);

        console.log(taxes);

        if (6875 < totalIncome && totalIncome < 13084) {
            taxes = totalIncome * .24;
        } else if (13084 < totalIncome && totalIncome < 16667) {
            taxes = totalIncome * .32;
        } else if (16667 < totalIncome && totalIncome < 41667) {
            taxes = totalIncome * .35;
        } else if (41667 < totalIncome) {
            taxes = totalIncome * .37;
        } else {
            taxes = totalIncome * .22;
        }

        player.taxes = Math.round(taxes);
        
        return Math.round(taxes);
    },
    getLoan: function(currentPlayer, amount){
        const player = GameState.players[currentPlayer]

        var loansExist = false;

        // Check for current loans, if present add to player expenses array
        let obj = player.expenses.find((item, i) => {
            if (item.type === 'loans'){
                player.cash = player.cash + amount;
                item.cost = item.cost + amount;
                item.payment = item.cost * .1;
                loansExist = true;
            } 

            return obj;
        });

        // if no loans are present, add new expense
        if (!loansExist){
            player.cash = player.cash + amount;

            player.expenses.push({
                type: 'loans',
                cost: amount,
                payment: amount * .1
            })
        }
    },
    pay: function(currentPlayer, amount){
        const player = GameState.players[currentPlayer]

        // Subtract amount from player cash
        player.cash = player.cash - amount;

        // Update statement
        Calc.updateStatement(currentPlayer)
    },
    buyStock: function (currentPlayer, type, price, amount) {
        const player = GameState.players[currentPlayer]

        var alreadyOwned = false;

        // Check for previous stock in player assets
        let assetObj = player.stockAssets.find((item, i) => {
            // If stock exists pay and add shares to current amount
            if (item && item.type === type /*&& item.price === price*/){
                alreadyOwned = true;
                player.cash -= price * amount;
                item.shares += amount;
            }  
        });

        // If already owned add new stock to assets
        if (!alreadyOwned) {
            player.cash -= price * amount;

            player.stockAssets.push({
                type: type,
                symbol: GameState.currentDeal.symbol,
                shares: amount,
                purchasePrice: [],
            }) 
        }

        let findStock = player.stockAssets.find((item) => {
            if (item && item.type === type){
                item.purchasePrice.push([price, amount])
            }  
        })

        GameState.events.push(amount + ' shares of ' + GameState.currentDeal.symbol + ' purchased at ' + price)

        console.log('buy stock ', player.stockAssets)
    },
    sellStock: function(currentPlayer, type, amount, oldPrice, newPrice){
        const player = GameState.players[currentPlayer]

        // Check for previous stock in player assets
        var removeIndex = null;
        let assetObj = player.stockAssets.find((item, i) => {
            // If stock exists pay and add shares to current amount
            if (item && item.type === type /*&& item.price === oldPrice*/){
                player.cash += newPrice * amount;
                item.shares -= amount;
            } 

            if (item && item.shares === 0){
                console.log('item', item)
                removeIndex = i
            }
        });

        if (removeIndex){
            player.stockAssets.splice(removeIndex, 1);
        }

        GameState.events.push(amount + ' shares of ' + GameState.currentDeal.symbol + ' sold at ' + newPrice)

        console.log('sold stock ', player.stockAssets)
    },
};

export default Calc