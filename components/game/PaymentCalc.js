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
        setPayCalcType,
        setRefresh
    } = props;

    const [payCalcAmt, setPayCalcAmt] = useState(1000);
    const [payCalcName, setPayCalcName] = useState('None Selected');

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
        
        if (GameState.paymentCalc.type === null || GameState.paymentCalc.type === 'none') {
            setPayCalcType('none')

        } 

        // Set Name
        switch(GameState.paymentCalc.type) {
            case 'loans':
                setPayCalcName('Loans')
                break;
            case 'mortgage':
                setPayCalcName('Mortgage')
                break;
            case 'car loan':
                setPayCalcName('Car Loan')
                break;
            case 'credit debt':
                setPayCalcName('Credit Debt')
                break;
            case 'retail debt':
                setPayCalcName('Retail Debt')
                break;
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

                    setPayCalcType('none')
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

        switch(type) {
            case 'loans':
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
        
        if (newCost > 0){
            setTotalPayCalcCost(newCost)
        } 

        if (newCost === 0) {
            GameState.paymentCalc.type = 'none';
            setPayCalcType('none')
        }

        Calc.updateStatement(GameState.currentPlayer);
        setRefresh(true)
    }

    const payCalcDone = () => {
        GameState.paymentCalc.type = null;

        //dispatch(getPayCalc(false))
        //setTotalPayCalcCost(0)
        setPaymentCalcState(false)
        setPayCalcType('none')
        setRefresh(true)
    }
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Payment Calc</Text>
            <Text style={{
                color:'#753838',
                fontSize: 22,
                marginHorizontal: 5,
            }}>{payCalcName}</Text>
            <View style={styles.row}>
                <Text>Payment</Text>
                <Text>${Main.numWithCommas(payCalcAmt)}</Text>
            </View>
            <View style={styles.row}>
                <Text>Debt Amount</Text>
                <Text>${Main.numWithCommas(totalPayCalcCost)}</Text>
            </View>
            <View style={styles.row}>
                {GameState.paymentCalc.type === 'none' || !GameState.paymentCalc.type 
                    ? <View></View> 
                    : <Pressable
                        style={styles.payBtn}
                        onPress={()=>{
                            if (player.cash >= payCalcAmt ){
                                payCalcPay(GameState.paymentCalc.type, payCalcAmt);
                            } else {
                                console.log('not enough to make ' + GameState.paymentCalc.type + ' payment')
                            }          
                        }}>
                        <Text>PAY</Text>
                    </Pressable>
                }
                <Pressable
                    style={styles.doneBtn}
                    onPress={()=>{
                        Calc.updateStatement(GameState.currentPlayer);
                        GameState.paymentCalc.open = false;
                        
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
        width: '100%',
        height: 300,
        //backgroundColor: '#ffffff',
        borderRadius: 25,
        elevation: 5,
        paddingHorizontal: 50,
        paddingVertical: 20,
    },
    title: {
        fontSize: 22,
        marginHorizontal: 5,
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    },
    payBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    },
    doneBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    },
    row:{ 
        fontSize: 16,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        margin: 7,
    },
    text: {
        textAlign: 'center',
    },
})

export default PaymentCalc
