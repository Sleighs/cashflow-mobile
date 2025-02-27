import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Button, Pressable, Dimensions, SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

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
import Calc from '../../js/Calc';
import Main from '../../js/Main';
import Stock from './Stock'
import Alert from '../main/Alert'


const EventViewer = (props) => {
    const dispatch = useDispatch()
    const [showBtns, setShowBtns] = useState(false)

    const [timesPressed, setTimesPressed] = useState(0);

    let textLog = '';
    if (timesPressed > 0) {
        textLog = timesPressed + 'x ';
    } 

    return ( 
        <View style={styles.eventViewer}>
            <View style={styles.eventViewerTextContainer}>
                <Text style={styles.eventViewerText}>{GameState.events[GameState.events.length - 1]}</Text>
            </View>
            {!showBtns 
                ? <View></View>
                : <View style={styles.eventViewerBtnContainer}>
                    <Pressable
                        onPress={() => {
                            setTimesPressed((current) => current + 1);
                        }}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                ? 'rgb(210, 230, 255)'
                                : 'white',
                                borderRadius: 8,
                                padding: 6
                            }
                        ]}>
                        {({ pressed }) => (
                            <Text style={styles.text}>
                                {textLog + (pressed ? 'Pressed!' : 'Press Me')}
                            </Text>
                        )}
                    </Pressable>
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
            }
        </View>
    )
}

const RatRacePhaseContainer = (props) => {
    const player = GameState.players[GameState.currentPlayer];

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
    const { navigation } = props

    const [loaded, setLoaded] = useState(false);
    const [gamePhase, setPhase] = useState(null)
    const [turnPhase, setTurnPhase] = useState(null)
    const [data, setData] = useState(null)
    const [selectedSpace, setSelectedSpace] = useState(null)
    const [paymentCalcState, setPaymentCalcState] = useState(null)
    const [currentSpace, setCurrentSpace] = useState(null)
    const [rolled, setRolled] = useState(false)
    const [cardInfo, setCardInfo] = useState(null)
    const [totalPayCalcCost, setTotalPayCalcCost] = useState(0);
    const [payCalcType, setPayCalcType] = useState(null)
    const [refresh, setRefresh] = useState(null)
    const [debtState, setDebtState] = useState(null)
    const [debtAmount, setDebtAmount] = useState(null)

    const dispatch = useDispatch()

    if (gamePhase === null){
        setPhase(GameState.gamePhase)
    } 

    if (refresh) {
        setRefresh(false)
    }

    function useDidMount() {
        const didMountRef = useRef(true);
        
        useEffect(() => {
          didMountRef.current = false;
        });

        return didMountRef.current;
    };

    const didMount = useDidMount()

    useEffect(() => {
        /*if (didMount) {
            console.log('mounted');
          } else {
            console.log('state updated');
          }*/

        Calc.updateStatement(GameState.currentPlayer)

        //setLoaded(true)
    })

    /*if (!loaded){
        return(
          <View style={{ 
            flex: 1,
            justifyContent: 'center', 
            backgroundColor: 'navy', 
            textAlign: 'center', 
            alignItems: 'center' 
          }}>
            <Text style={{ 
              fontSize: 30, 
              color: 'lightgray' 
            }}>
              Loading...
            </Text>
          </View>
        );
    }*/

    
    
    if (GameState.gamePhase === "rat race") {
        return (
            <SafeAreaView style={{
                flex: 1,
                paddingTop: StatusBar.currentHeight,
                paddingBottom: 50,
            }}>
                <View style={styles.container}>
                    <RatRacePhaseContainer 
                        playerObj={GameState.players[GameState.currentPlayer]}
                        data={data}
                        setData={setData}
                        gamePhase={gamePhase} 
                        setPhase={setPhase} 
                        paymentCalcState={paymentCalcState} 
                        setPaymentCalcState={setPaymentCalcState}
                        selectedSpace={selectedSpace} 
                        setSelectedSpace={setSelectedSpace}
                        cardType={BoardSpaces[player.currentSpace - 1].field} 
                        cardInfo={cardInfo} 
                        setCardInfo={setCardInfo}
                        currentSpace={currentSpace} 
                        setCurrentSpace={setCurrentSpace}
                        turnPhase={turnPhase}
                        setTurnPhase={setTurnPhase}
                        rolled={rolled}
                        setRolled={setRolled}
                        totalPayCalcCost={totalPayCalcCost} 
                        setTotalPayCalcCost={setTotalPayCalcCost}
                        payCalcType={payCalcType}
                        setPayCalcType={setPayCalcType}
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />
                </View>
            </SafeAreaView>
        )
    } else if (GameState.gamePhase === "fast track") {
        return (
            <SafeAreaView style={{
                flex: 1,
                paddingTop: StatusBar.currentHeight,
            }}>
                <View style={styles.container}>
                    <EventViewer {...props}/>
                    <Text>Fast Track</Text>
                </View>
            </SafeAreaView>
        )
    } else if (GameState.gamePhase === 'dream selection') {
        return (     
            <SafeAreaView style={{
                flex: 1,
                paddingTop: StatusBar.currentHeight,
            }}>
                <View style={styles.container}>
                    <EventViewer {...props}/>

                    <DreamPhaseContainer 
                        setPhase={setPhase} 
                        playerObj={GameState.players[GameState.currentPlayer]}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    // Container
    container: {
        backgroundColor: '#eaf0f2',
        flexDirection: "column",
        flex: 1,
        zIndex: 3,
        alignItems: 'center',
        alignContent: 'center',
        maxWidth: Dimensions.get('window').width,
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
    },

    // Event Viewer
    eventViewer: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        flex: 1,
        
        
    },
    eventViewerTextContainer: {
        textAlign: 'center',
        //backgroundColor: 'darkslategray',
        width: (Dimensions.get('window').width),
        paddingHorizontal: 10,
        paddingVertical: 5,
        flex: 1,
        fontSize: 16,
    },
    eventViewerText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 16,
    },
    eventViewerBtnContainer: {
        flexDirection: 'row',
        flex: 1,
    },

    // Rat Race
    ratRacePhaseContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
})

