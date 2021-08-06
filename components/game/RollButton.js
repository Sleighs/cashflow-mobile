import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import GameState from '../../js/GameState';
import Main from '../../js/Main';

const RollButton = (props) => {
    const { type, rolled, setRolled, turnPhase, setTurnPhase, cardInfo, setCardInfo} = props;
    const player = GameState.players[GameState.currentPlayer];
    
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.btn}
                onPress={()=>{
                    Main.movePlayer('normal')
                    setRolled(true)
                    setTurnPhase('middle')
                    setCardInfo(GameState.midPhaseInfo)
                }}>
                <Text style={styles.text}>Roll</Text>
            </Pressable>
            {player.charityTurns > 0 
                ? <Pressable
                    style={styles.btn}
                    onPress={()=>{
                        Main.movePlayer('double')
                        setRolled(true)
                        setTurnPhase('middle')
                        setCardInfo(GameState.midPhaseInfo)
                    }}>
                    <Text style={styles.text}>Roll 2x</Text>
                </Pressable>
                : <View></View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'column'
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


export default RollButton
