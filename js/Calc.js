import GameState from "./GameState";
import uuid from 'react-uuid'
import Main from "./Main";

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

        let playerRealEstateAssets = player.realEstateAssets.find((item) => {
            if (item) {
                income += item.income 
            }
        })

        let cdAssets = player.cdAssets.find((item) => {
            if (item) {
                income += item.dividend * item.amount 
                console.log(item.dividend * item.amount)
            }
        })

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
                payment: amount * .1,
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
    buyStock: function (currentPlayer, type, symbol, price, shares, saleRecord, dividend) {
        const player = GameState.players[currentPlayer]

        var alreadyOwned = false;
        var record = saleRecord;

        if (type === 'Certificate of Deposit'){
            // Check for previous stock in player assets
            let assetObj = player.cdAssets.find((item, i) => {
                // If stock exists pay and add shares to current amount
                if (item && item.symbol === symbol /*&& item.price === price*/){
                    alreadyOwned = true;
                    player.cash -= price * shares;
                    item.amount += shares;
                    item.transactions.push(saleRecord)
                }  
            });

            // If not already owned add new stock to assets
            if (!alreadyOwned) {
                player.cash -= price * shares;

                player.cdAssets.push({
                    type: type,
                    symbol: symbol,
                    amount: shares,
                    transactions: [],
                    id: uuid(),
                    dividend: dividend
                }) 
            }

            // Save transactions details
            let findStock = player.cdAssets.find((item) => {
                if (item && item.symbol === symbol){
                    record.newBalance = player.cash;
                    record.totalShares = item.amount;

                    item.transactions.push(record)
                }  
            })

            // Save event
            GameState.events.push(shares + ' cd\'s of ' + symbol + ' purchased at ' + price)

        } else {
            // Check for previous stock in player assets
            let assetObj = player.stockAssets.find((item, i) => {
                // If stock exists pay and add shares to current amount
                if (item && item.symbol === symbol /*&& item.price === price*/){
                    alreadyOwned = true;
                    player.cash -= price * shares;
                    item.shares += shares;
                    item.transactions.push(saleRecord)
                }  
            });

            // If not already owned add new stock to assets
            if (!alreadyOwned) {
                player.cash -= price * shares;

                player.stockAssets.push({
                    type: type,
                    symbol: symbol,
                    shares: shares,
                    transactions: [],
                    id: uuid(),
                }) 
            }

            // Save transactions details
            let findStock = player.stockAssets.find((item) => {
                if (item && item.symbol === symbol){
                    record.newBalance = player.cash;
                    record.totalShares = item.shares;

                    item.transactions.push(record)
                }  
            })

            // Save event
            GameState.events.push(shares + ' shares of ' + symbol + ' purchased at ' + price)

            console.log('buy stock ', player.stockAssets)
        }
    },
    sellStock: function(currentPlayer, type, symbol, sharesToSell, purchasePrice, saleRecord){
        const player = GameState.players[currentPlayer]

        // Check for previous stock in player assets
        var removeIndex = null;

        var record = saleRecord;

        if (type === 'Certificate of Deposit'){
            let assetObj = player.cdAssets.find((item) => {
                // If cd exists add payment and subtract shares from owned shares
                if (item && item.symbol === symbol){
                    player.cash += purchasePrice * sharesToSell;
                    item.amount -= sharesToSell;
                    record.newBalance = player.cash;
                    record.totalShares = item.amount;
                    item.transactions.push(record)
                } 
            });
            GameState.events.push(sharesToSell + ' cd\'s of ' + symbol + ' sold at ' + purchasePrice)

            console.log('sold stock ', player.cdAssets)
        } else {
            let assetObj = player.stockAssets.find((item) => {
                // If stock exists add payment and subtract shares from owned shares
                if (item && item.symbol === symbol){
                    player.cash += purchasePrice * sharesToSell;
                    item.shares -= sharesToSell;
                    record.newBalance = player.cash;
                    record.totalShares = item.shares;
                    item.transactions.push(record) 
                } 
            });
            GameState.events.push(sharesToSell + ' shares of ' + symbol + ' sold at ' + purchasePrice)

            console.log('sold stock ', player.stockAssets)
        }

        
    },
    buyRealEstate: function(property){
        const player = GameState.players[GameState.currentPlayer]
        //var id = uuid();
        var timestamp = new Date().getTime();

        var newProperty = {
            id: property.id,
            timestamp: timestamp,
            type: property.type,
            income: property.cashFlow,
            name: property.name,
            landType: property.landType,
            mortgage: property.mortgage,
            cost: property.cost,
            downPayment: property.downPayment,
            description: property.description,
        }


        // add to asset array
        
        player.realEstateAssets.push(newProperty)

        player.cash -= property.downPayment;

        console.log('buyRealEstate property', newProperty)

        Calc.updateStatement(GameState.currentPlayer)

    },
    buyCoin: function(currentPlayer, coin){
        const player = GameState.players[currentPlayer];
        var alreadyOwned = false;

        let coinSearch = player.coinAssets.find((item) => {
            if (item && item.type === coin.type){
                alreadyOwned = true;
                item.amount += coin.amount;
                player.cash -= coin.cost;
            }
        })

        var newCoin = {
            amount: coin.amount,
            cost: coin.cost,
            name: coin.name,
            type: coin.type,
            id: Main.makeid(),
        }

        if (!alreadyOwned){
            player.coinAssets.push(newCoin)
            player.cash -= coin.cost;
        }

        console.log('coin purchased')
    },
};

export default Calc