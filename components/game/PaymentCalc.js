import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import Calc from '../../js/Calc';
import GameState from '../../js/GameState';
import Main from '../../js/Main';
import { getPayCalc } from '../../redux/reducers/rootReducer';

const PaymentCalc = (props) => {
    const player = GameState.players[GameState.currentPlayer];
    const { 
        paymentCalcState, 
        setPaymentCalcState, 
        totalPayCalcCost, 
        setTotalPayCalcCost,
        payCalcType,
        setPayCalcType
    } = props;
    const [payCalcAmt, setPayCalcAmt] = useState(1000);
    

    const dispatch = useDispatch()

    var expenseArr = player.expenses;
    

    useEffect(() => {

        var cost = 0;

        let loanObj = expenseArr.find(item => {
            // save cost of it
            if (item.type === GameState.paymentCalc.type){
                cost = item.cost
            }
        });

        console.log('cost', cost)

        setTotalPayCalcCost(cost)
        
        if (GameState.paymentCalc.type) {
            setPayCalcType('none')
        } 
    })

    
    const payCalcPay = (type, amount) => {
        var newCost = 0;
        // get info from player.expenses array
        var playerExpensesArr = player.expenses;

        console.log('before arr', playerExpensesArr)

        // Search expenses for selected expense
        let obj = playerExpensesArr.find((item, i) => {
            // If fully paid remove from array
            if (item){
                if (item.type === type && (item.cost === amount || item.cost < amount)){
                    playerExpensesArr.splice(i, 1);
                    GameState.paymentCalc.type = 'none';
                    player.cash -= item.cost; 
                } else if (item.type === type){
                    item.cost -= amount;
                    player.cash -= amount;
                    newCost = item.cost;

                    return item
                }
            }
        });

        console.log('payCalcPay result', {
            type: type,
            amount: amount,
            cost: newCost,
            playerExpensesArr: player.expenses
        })

        // if new amount = 0
        switch(type) {
            case 'loan':
                console.log('loan paid');
                break;
            case 'mortgage':
                console.log('mortgage paid');
                
                break;
            case 'credit debt':
                console.log('credit debt paid');
                break;
            case 'retail debt':
                console.log('retail debt paid')
                break;
            case 'boat debt':
                console.log('boat debt paid')
                break;
            case 'tv debt':
                console.log('tv debt paid')
                break;

        }
                               
        setTotalPayCalcCost(newCost)
    }

    const payCalcDone = () => {
        GameState.paymentCalc.open = false;
        GameState.paymentCalc.type = null;

        //dispatch(getPayCalc(false))
        setPaymentCalcState(false)
        setPayCalcType('none')
    }
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Payment Calc</Text>
            <Text>{GameState.paymentCalc.type}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5,}}>
                <Text>Payment</Text>
                <Text>${Main.numWithCommas(payCalcAmt)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5,}}>
                <Text>Debt Amount</Text>
                <Text>${Main.numWithCommas(totalPayCalcCost)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5,}}>
                {(GameState.paymentCalc.type === 'none') || !GameState.paymentCalc.type ?  <View></View> : <Pressable
                    onPress={()=>{
                        if (player.cash >= payCalcAmt ){
                            payCalcPay(GameState.paymentCalc.type, payCalcAmt);
                        } else {
                            console.log('not enough to make ' + GameState.paymentCalc.type + ' payment')
                        
                        }          
                        Calc.updateStatement(GameState.currentPlayer);
                    }}>
                    <Text>PAY</Text>
                </Pressable>}
                <Pressable
                    onPress={()=>{
                        payCalcDone()
                    }}>
                    <Text>DONE</Text>
                </Pressable>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'column',
        width: 375,
        height: 300,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        elevation: 5,
        paddingHorizontal: 50,
        paddingVertical: 20,
    },
    title: {

    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    },
    text: {
        textAlign: 'center',
    },
})


export default PaymentCalc
