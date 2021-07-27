import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import GameState from './GameState';


const Board = () => {
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
            
            
        </View>
        
    )
}

export default Board