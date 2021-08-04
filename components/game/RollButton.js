import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import GameState from '../../js/GameState';
import Main from '../../js/Main';

const RollButton = (props) => {
    const { type, rolled, setRolled, turnPhase, setTurnPhase, cardInfo, setCardInfo} = props;

    if (type === 'normal'){
        return (
            <View style={styles.container}>
                <Pressable
                    style={styles.btn}
                    onPress={()=>{
                        Main.movePlayer(type)
                        setRolled(true)
                        setTurnPhase('middle')
                        setCardInfo(GameState.midPhaseInfo)
                    }}>
                    <Text style={styles.text}>Roll</Text>
                </Pressable>
            </View>
        )
    } else if (type === 'double') {
        return(
            <View style={styles.container}>
                <Pressable
                    style={styles.btn}
                    onPress={()=>{
                        GameState.movePlayer(type)
                        setRolled(true)
                        setTurnPhase('middle')
                        setCardInfo(GameState.midPhaseInfo)
                    }}>
                    <Text style={styles.text}>Roll 2x</Text>
                </Pressable>
            </View> 
        )
    }
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
