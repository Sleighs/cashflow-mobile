import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Pressable, Dimensions } from 'react-native'

import Card from './Card'
import Board from './Board'
import Statement from './Statement'

import GameState from '../../js/GameState'
import DreamPhase from '../../js/DreamPhase'
import BoardSpaces from '../../js/BoardSpaces'
import DreamPhaseContainer from './DreamPhaseContainer'

import store from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getGameData, getUser } from '../../redux/reducers/rootReducer'

const EventViewer = (props) => {

    const dispatch = useDispatch()

    return ( 
        <View style={styles.eventViewer}>
            <Text style={styles.eventViewerText}>{GameState.events[GameState.events.length - 1]}</Text>
            <View style={{flexDirection: 'row'}}>
                <Pressable
                    style={{
                        justifyContent: 'center',
                        textAlign: 'center',
                        alignContent: 'center',
                        height: 30,
                        width: 90,
                        borderRadius: 15,
                        backgroundColor: '#ffffff',
                    }}
                    onPress={()=>{
                        dispatch(getGameData(GameState))
                    }}>
                    <Text>Save State</Text>
                </Pressable>
                <Pressable
                    style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        textAlign: 'center',
                        height: 30,
                        width: 90,
                        borderRadius: 15,
                        backgroundColor: '#ffffff',
                    }}
                    onPress={()=>{
                        console.log(store.getState())
                    }}>
                    <Text>Print State</Text>
                </Pressable>
            </View>
        </View>
    )
}

const RatRacePhaseContainer = (props) => {
    const { data, setData } = props;
    const [selectedSpace, setSelectedSpace] = useState(null);

    return (
        <View style={styles.ratRacePhaseContainer}>
            <EventViewer {...props}/>
            <Board {...props}/>
            <Card {...props}/>
            <Statement {...props}/>
        </View>
    )
}


export default function Game(props) {
    const player = GameState.players[GameState.currentPlayer];
    const [gamePhase, setPhase] = useState(null)
    const [data, setData] = useState(null)
    const [paymentCalc, openPaymentCalc] = useState(false)
    const [selectedSpace, setSelectedSpace] = useState(null)
    const [paymentCalcState, setPaymentCalcState] = useState(null)
    const [currentSpace, setCurrentSpace ] = useState(null)
    const [rolled, setRolled] = useState(false)
    const [cardInfo, setCardInfo] = useState(null)

    const dispatch = useDispatch()

    if (gamePhase === null){
        setPhase(GameState.gamePhase)
        
        //dispatch(getGameData(GameState))
    } else {
        //dispatch(getGameData(GameState))
    }
    
    if (GameState.gamePhase === "rat race") {    
        return (
            <View style={styles.container}>
                <RatRacePhaseContainer 
                    playerObj={GameState.players[GameState.currentPlayer]}
                    data={data}
                    setData={setData}
                    gamePhase={gamePhase} 
                    setPhase={setPhase} 
                    paymentCalc={paymentCalc}
                    openPaymentCalc={openPaymentCalc}
                    paymentCalcState={paymentCalcState} 
                    setPaymentCalcState={setPaymentCalcState}
                    selectedSpace={selectedSpace} 
                    setSelectedSpace={setSelectedSpace}
                    cardType={BoardSpaces[player.currentSpace - 1].field} 
                    cardInfo={cardInfo} 
                    setCardInfo={setCardInfo}
                    currentSpace={currentSpace} 
                    setCurrentSpace={setCurrentSpace}
                    
                    rolled={rolled}
                    setRolled={setRolled}
                />
            </View>
        )
    } else if (GameState.gamePhase === "fast track") {
        return (
            <View style={styles.container}>
                <Text>Fast Track</Text>
            </View>
        )
    } else if (GameState.gamePhase === 'dream selection') {
        return (     
            <View style={styles.container}>
                <DreamPhaseContainer 
                    setPhase={setPhase} 
                    playerObj={GameState.players[GameState.currentPlayer]}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // Container
    container: {
        backgroundColor: '#ebe9e3',
        flexDirection: "column",
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
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
        borderColor: 'silver',
        borderRadius: 12,
        flex: 2,
        
    },
    eventViewerText: {
        color: '#ffffff',
        maxWidth: (Dimensions.get('window').width) * .9,
        height: 20,
    },

    
    // Rat Race
    ratRacePhaseContainer:{
        justifyContent: 'center',

    },

    
})

