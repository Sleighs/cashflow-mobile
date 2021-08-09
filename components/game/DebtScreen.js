import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Dimensions, SafeAreaView, StatusBar } from 'react-native'
import Calc from '../../js/Calc';
import GameState from '../../js/GameState';
import Main from '../../js/Main';

const LoanApproved = (props) => {
    const player = GameState.players[GameState.currentPlayer]

    const { 
        debtState, 
        setDebtState, 
        debtAmount, 
        setDebtAmount ,
        setRefresh
    } = props;

    const [text1, setText1] = useState('Loan Approved')

    const roundLoan = (amount) => {
        var loanAmt = 1000;

        if (GameState.debtScreen.cost < 1000){
            return loanAmt
        }

        if (1000 <= GameState.debtScreen.cost){
            loanAmt  = Math.round(GameState.debtScreen.cost / 1000) * 1000

            return loanAmt
        } 
    }

    return (
        <View style={styles.container}>
            <Text style={styles.cardTitle}>Debt Screen</Text>
            <Text style={styles.cardText}>{text1}</Text>
            
            {GameState.debtScreen.cost <= player.cash 
                ? <Pressable 
                    style={styles.loanBtn}
                    onPress={() => {
                        //Calc.pay(GameState.currentPlayer, GameState.debtScreen.cost)

                        //setDebtState(false)

                        //console.log('debt paid')

                        GameState.debtScreen.open = false;

                        setRefresh(true)
                    }}>
                    <Text>Return to Pay</Text>
                </Pressable>
                : <Pressable
                    style={styles.loanBtn}
                    onPress={() => {
                        // add loan
                        Calc.getLoan(GameState.currentPlayer, 1000)
                        
                        setRefresh(true)
                    }}>
                    <Text>Get loan</Text>
                </Pressable>
            }
        </View>
    )
}

const Bankruptcy = (props) => {
    const player = GameState.players[GameState.currentPlayer]

    const { 
        debtState, 
        setDebtState, 
        debtAmount, 
        setDebtAmount  
    } = props;

    const [text1, setText1] = useState('Bankruptcy')

    return (
        <View style={styles.container}>
            <Text style={styles.cardTitle}>Debt Screen</Text>
            <Text style={styles.cardText}>{text1}</Text>
        </View>
    )
}

const Retirement = (props) => {
    const player = GameState.players[GameState.currentPlayer]

    const { 
        debtState, 
        setDebtState, 
        debtAmount, 
        setDebtAmount  
    } = props;

    const [text1, setText1] = useState('Retirement')

    return (
        <View style={styles.container}>
            <Text style={styles.cardTitle}>Debt Screen</Text>
            <Text style={styles.cardText}>{text1}</Text>

            <Pressable
                style={styles.btn}
                onPress={()=>{
                    Main.endTurn()
                }}>
                <Text>End</Text>
            </Pressable>
        </View>
    )
}

const DebtScreen = (props) => {
    const player = GameState.players[GameState.currentPlayer]

    const { 
        debtState, 
        setDebtState, 
        debtAmount, 
        setDebtAmount,  
    } = props;

    useEffect(() => {
       
    })

    /* 
    debt states
        check
        approved
        not approved (game over)
    */

    // if loan needed show loan option
    
    // if negative income player cannot get loan 
        // enter bankruptcy if assets are available to sell

    // show how much $ needed

    // show retirement, end game if player has no cash, income or assets 
    if (!player.loanApproved && player.assets.length < 0){
        //
        return(
            <Retirement {...props}/>
        )
        
    } 

    // If player has no cash or income 
    // if player can sell assets to pay debt
    if (!player.loanApproved && player.assets.length > 0){
        //
        return(
            <Bankruptcy {...props}/>
        )
    } 

    // If player has income allow them to get loans 
    if (player.loanApproved){
        // 
        return(
            <LoanApproved {...props}/>
        )
    } 
    
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: "#ffffff",
        height: 300,
        paddingHorizontal: 30,
        paddingVertical: 20,
        justifyContent: 'space-between'
    },
    cardTitle: {
        textTransform: 'capitalize',
        fontSize: 26,
        fontWeight: "500",
    },
    btn: {
        
    },
    loanBtn: {
        //height: 40,
        //width: 100,
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 25,
        backgroundColor: 'white',
        textAlign: 'center',
    }
})

export default DebtScreen