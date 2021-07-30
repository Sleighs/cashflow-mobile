import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import GameState from '../../js/GameState';

const RollPhase = () => {
    return(
        <View>
            <View>
                <Text style={{textTransform: 'capitalize'}}>{GameState.players[GameState.currentPlayer].name}'s Turn</Text>
                <Text>When You are ready, roll the die and take your turn</Text>
                <Text>Before you start your turn, review your financial statement. You may also use this time to repay liabilities or borrow money.</Text>

            </View>
            <View>
                <RollButton type={'normal'}/>
            </View>
        
        </View>
    )
}
const MidPhase = () => {
    return(
        <View>
            <Text>Middle phase</Text>
        </View>
    )
}
const EndPhase = () => {
    return(
        <View>
            <Text>End phase</Text>
        </View>
    )
}
const Card = () => {

    return(
        <View style={styles.cardContainer}>
            {GameState.turnPhase === 'roll' ? <RollPhase /> : 
                GameState.turnPhase === 'middle' ? <MidPhase /> :
                    GameState.turnPhase === 'end' ? <EndPhase /> : <Text>No phase detected</Text>


            }
            <Text>Card</Text>
        </View>    
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#ffffff",
        height: 300,
        width: '100%',
    },
})

export default Card