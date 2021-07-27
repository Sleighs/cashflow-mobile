import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import GameState from './GameState';

const Statement = () => {
    const [playerObj, setPlayerObj] = useState(null);
    
    const getPlayer = ()=>{
        if (!playerObj && GameState.players[0]){
            setPlayerObj(GameState.players[0])
        }
    }
    
    if (!playerObj){
        getPlayer()
    }

    return(
        <View>
            {!playerObj ? (
                <View></View>
            ) : (
                <View>
                    <Text>Name: {playerObj.name}</Text>
                    <Text>JobTitle: {playerObj.jobTitle}</Text>
                    <Text>Salary: {playerObj.startingSalary}</Text>
                    <Text>Savings: {playerObj.startingSavings}</Text>
                    <Text>Insurance: {!playerObj.hasInsurance ? 'None' : 'Insured'}</Text>
                </View>
            )}
        </View>
        
    )
}

export default Statement