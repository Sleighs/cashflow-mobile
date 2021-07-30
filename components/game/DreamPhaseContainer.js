import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Pressable } from 'react-native'

import GameState from '../../js/GameState'
import DreamPhase from '../../js/DreamPhase'
import BoardSpaces from '../../js/BoardSpaces'


const DreamPhaseContainer = ({ gamePhase, setPhase, playerObj }) => {
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

    if (gamePhase === 'dream selection'){
        GameState.event.push('Dream Selection');

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
                        // Enable button to only work on player's turn

                        GameState.players[0].dream = DreamPhase.dreams[DreamPhase.currentDream];

                        GameState.event.push("Dream selected");
                        
                        // Add player to board
                        BoardSpaces.space1.players.push(GameState.players[0].name);

                        // Save move
                        GameState.players[GameState.currentPlayer].moved = true;
                        
                        // Check if all players have moved
                        for (var a = 0; a < GameState.players.length; a++){
                            var phaseCheck = 0;

                            if (GameState.players[a].moved) {
                                phaseCheck += 1;
                            }
                            
                            if (phaseCheck === GameState.playerCount) {
                                GameState.gamePhase = "rat race";
                                setPhase(GameState.gamePhase);
                                GameState.event.push("Welcome to the Rat Race!");
                            }
                        }

                        // End turn
                        GameState.endTurn();
                
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

const styles = StyleSheet.create({
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

})

export default DreamPhaseContainer