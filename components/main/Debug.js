import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useStore } from 'react-redux'
import GameState from '../../js/GameState';

const getGameState = (state) => {
    return(
        <View 
            style={styles.debug1}>
            <Text>{JSON.stringify(state)}</Text>
        </View>
    )
}


export default function Debug() {
    const [state,  setState] = useState('state')
   
    const store = useStore();
        

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Debug</Text>
            {getGameState(GameState)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        color: 'black',
    },
    debug1: { 
        fontSize: 18, 
        justifyContent: 'center', 
        width: '85%',
    },
})