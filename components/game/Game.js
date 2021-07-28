import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Pressable } from 'react-native'
import CurrentPlayer from './CurrentPlayer'
import Board from './Board'
import DreamPhase from './DreamPhase'
import GameState from './GameState'
import Statement from './Statement'


const DreamPhaseContainer = ({ phase, setPhase, playerObj }) => {
    const [dream, setDream] = useState(DreamPhase.currentDream);
    const getJobText = (jobTitle) =>{
        var text = "You are a " + jobTitle + ".";
        switch (jobTitle){
            case 'Engineer':
                text = "You are an Engineer.";
                break;
            case 'Airline Pilot':
                text = "You are an Airline Pilot.";
                break;
            default:
                text = "You are a " + jobTitle + "."
        }
        return(text);
    }

    if (phase === 'dream selection'){
        return (
            <View style={styles.dreamSelectionContainer}>
                <View style={styles.dreamSelectionTop}>
                    <Text style={styles.dreamSelTitle}>Choose Dream</Text>
                    <Text style={styles.dreamSelTitle2}>{DreamPhase.dreams[DreamPhase.currentDream]}</Text>
                    <Text style={styles.dreamSelDes}>{DreamPhase.dreamDescriptions[DreamPhase.currentDream]}</Text>
                </View>
                <View style={styles.dreamSelBtnsContainer}>
                    <Pressable 
                        style={[styles.dreamSelBtns, styles.dreamSelBtnLeft]}
                        onPress={() => {
                            if (DreamPhase.currentDream === 0) {
                                DreamPhase.currentDream = DreamPhase.dreams.length - 1;
                            } else {
                                DreamPhase.currentDream--;
                            }    
                            setDream(DreamPhase.currentDream)                
                        }}>
                        <Text style={styles.dreamSelText}>Prev</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.dreamSelBtns, styles.dreamSelBtnRight]}
                        onPress={() => {
                            if (DreamPhase.currentDream === DreamPhase.dreams.length - 1) {
                                DreamPhase.currentDream = 0;
                            } else {
                                DreamPhase.currentDream++;
                            } 
                            setDream(DreamPhase.currentDream)  
                        }}>
                        <Text style={styles.dreamSelText}>Next</Text>
                    </Pressable>
                </View>
                <Pressable
                    style={styles.dreamSetBtn}
                    onPress={() => {
                        GameState.players[0].dream = DreamPhase.dreams[DreamPhase.currentDream];
                        GameState.phase = "rat race";
                        setPhase(GameState.phase);
                        GameState.event = GameState.players[0].dream + ": dream selected";
                        console.log('dream selected: ', GameState.players[0].dream);
                    }}
                >
                    <Text style={styles.dreamSetText}>Select Dream</Text>
                </Pressable>
                <View style={styles.startingStats}>
                    <Text style={styles.startingStatsText}>{getJobText(playerObj.jobTitle)}</Text>
                    <Text style={styles.startingStatsText}>Your starting salary is ${playerObj.startingSalary}.</Text>
                    <Text style={styles.startingStatsText}>You have ${playerObj.startingSavings} in your savings.</Text>
                    <Text style={styles.startingStatsText}>That means your starting cash is ${playerObj.startingSavings}.</Text>
                </View>
            </View>
        )
    } else {
        return(<View></View>)
    }
}


const RatRacePhaseContainer = ({ playerObj, phase }) => {
    if (phase !== "rat race") {
        return (<View></View>)
    } else {
        return (
            <View>
                <Board moves={GameState.moves} gs={GameState}/>
                <Statement playerObj={playerObj}/>
            </View>
        )
    }
}

const EventViewer = () => {
    return ( 
        <View style={styles.eventViewer}>
            <Text>{GameState.event}</Text>
        </View>
    )
}

const DebugMenu = ({ navigation }) => {
    return(
        <View style={{

        }}>
            <Pressable 
                style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}
                onPress={() => navigation.navigate("Home")}
            >
                <Text>Home</Text>
            </Pressable>
            <Pressable 
                style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}
                onPress={() => navigation.navigate("GameSetup")}
            >
                <Text>Setup</Text>
            </Pressable>
        </View>
    )
}

export default function Game({ navigation }) {
    const [phase, setPhase] = useState(null)

    if (phase === null){
        setPhase(GameState.phase)
    }
    
    return (
        <View style={styles.container}>
            <DreamPhaseContainer phase={phase} setPhase={setPhase} playerObj={GameState.players[0]}/>

            <RatRacePhaseContainer phase={phase} setPhase={setPhase} playerObj={GameState.players[0]}/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    // Container
    container: {
        backgroundColor: 'gray',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
    },

    // Dream Phase
    dreamSelectionContainer: {
        backgroundColor: 'white',
        width: '90%',
        height: 615,
        borderRadius: 5,
        padding: 25,
        
    },
    dreamSelectionTop:{
        height: 275,
    },
    dreamSelTitle: {
        fontSize: 26,
        textAlign: 'center',
        height: 40,
        color: 'gold',
        fontWeight: "500",
        marginVertical: 15,
    },
    dreamSelTitle2: {
        textAlign: 'center',
        fontSize: 24,
        height: 60,
        fontWeight: 500,
    },
    dreamSelDes: {
        color: 'black',
        fontSize: 20,
        marginTop: 7,
        height: 150,
    },
    dreamSelBtnsContainer: {
        flexDirection:'row', 
        flexWrap:'wrap',
        justifyContent: 'space-between',
    },
    dreamSelBtns: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: 'gold',
        width: '25%',
        
    },
    dreamSelText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    
    dreamSelBtnLeft: {

    },
    dreamSelBtnRight: {

    },
    dreamSetBtn: { 
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: 'blue',
        marginTop: 8,
    },
    dreamSetText: {
        color: 'white',
        fontSize: 22,
    },
    startingStats: {
        justifyContent: 'center',
        marginTop: 20,
        
    },
    startingStatsText: {
        fontSize: 22,

    },

    // Rat Race

    // Event Viewer
    eventViewer: {
        borderRadius: 9,
        background: 'darkgray',
        color: 'white',
        justifyContent: 'center',
        margin: '25%',
        borderColor: 'silver'
    }
})

