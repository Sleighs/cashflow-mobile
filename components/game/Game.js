import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Pressable } from 'react-native'

import Card from './Card'
import Board from './Board'
import Statement from './Statement'

import GameState from '../../js/GameState'
import DreamPhase from '../../js/DreamPhase'
import BoardSpaces from '../../js/BoardSpaces'
import DreamPhaseContainer from './DreamPhaseContainer'

const EventViewer = () => {
    return ( 
        <View style={styles.eventViewer}>
            <Text style={styles.eventViewerText}>{GameState.event[GameState.event.length - 1]}</Text>
        </View>
    )
}


const RatRacePhaseContainer = ({ playerObj, gamePhase }) => {
    if (gamePhase !== "rat race") {
        return (<View></View>)
    } else {
        return (
            <View style={styles.ratRacePhaseContainer}>
                <EventViewer />
                <Card />
                <Board moves={GameState.moves} gs={GameState}/>
                <Statement playerObj={playerObj}/>
            </View>
        )
    }
}


export default function Game({ navigation }) {
    const [gamePhase, setPhase] = useState(null)

    if (gamePhase === null){
        setPhase(GameState.gamePhase)
    }
    
    return (
        <View style={styles.container}>
            <DreamPhaseContainer 
                gamePhase={gamePhase} 
                setPhase={setPhase} 
                playerObj={GameState.players[0]}
            />

            <RatRacePhaseContainer 
                gamePhase={gamePhase} 
                setPhase={setPhase} 
                playerObj={GameState.players[0]}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    // Container
    container: {
        backgroundColor: 'gray',
        flexDirection: "column",
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
    },

    // Event Viewer
    eventViewer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        backgroundColor: 'navy',
        margin: '25%',
        borderColor: 'silver',
        borderRadius: 12,
        height: 28,
        
    },
    eventViewerText: {
        color: '#ffffff',
        width: 200,
        height: 20,
    },

    
    // Rat Race
    ratRacePhaseContainer:{
        justifyContent: 'flex-start',
    },

    
})

