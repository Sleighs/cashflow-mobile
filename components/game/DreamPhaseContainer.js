import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import GameState from '../../js/GameState'
import DreamPhase from '../../js/DreamPhase'
import BoardSpaces from '../../js/BoardSpaces'
import Main from '../../js/Main'


const DreamPhaseContainer = ({ setPhase, playerObj }) => {
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
    useEffect(()=>{
        if (GameState.turnCount === 1){
            GameState.events.push('Dream Selection');
        }
    })
    

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
                    var player = GameState.players[GameState.currentPlayer];
                    
                    // Enable button to only work on player's turn

                    // Save dream
                    player.dream = DreamPhase.dreams[DreamPhase.currentDream];

                    GameState.events.push("Dream selected");
                    
                    // Add player to board
                    BoardSpaces[0].players.push(player.name);

                    // Save move
                    player.moved = true;

                    // Set player's current space 
                    player.currentSpace = 1;

                    // Check if all players have moved
                    for (var a = 0; a < GameState.players.length; a++){
                        var phaseCheck = 0;

                        if (GameState.players[a].moved) {
                            phaseCheck += 1;
                        }
                        
                        if (phaseCheck === GameState.playerCount) {
                            GameState.gamePhase = "rat race";
                            setPhase(GameState.gamePhase);
                            GameState.events.push("Welcome to the Rat Race!");
                        }
                    }

                    // End turn
                    Main.endTurn();
                }}
            >
                <Text style={styles.dreamSetText}>Select Dream</Text>
            </Pressable>
            <View style={styles.startingStats}>
                <Text style={styles.startingStatsText}>{getJobText(playerObj.jobTitle)}</Text>
                <Text style={styles.startingStatsText}>Your starting salary is ${Main.numWithCommas(playerObj.startingSalary)}.</Text>
                <Text style={styles.startingStatsText}>You have ${Main.numWithCommas(playerObj.startingSavings)} in your savings.</Text>
                <Text style={styles.startingStatsText}>That means your starting cash is ${Main.numWithCommas(playerObj.startingSavings)}.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // Dream Phase
    dreamSelectionContainer: {
        backgroundColor: 'white',
        alignContent: 'center',
        width: '92%',
        maxHeight: '90%',
        paddingHorizontal: 30,
        paddingVertical: 30,
        borderRadius: 15,
        flex: 12,
        marginBottom: 65,

        
    },
    dreamSelectionTop:{
        //height: '33%',
        marginBottom: 20,
        flex: 7,
        elevation: 3,
    },
    dreamSelTitle: {
        fontSize: 26,
        textAlign: 'center',
        height: '7%',
        color: 'gold',
        fontWeight: "500",
        marginVertical: 15,
    },
    dreamSelTitle2: {
        textAlign: 'center',
        fontSize: 24,
        height: 60,
        fontWeight: "500",
    },
    dreamSelDes: {
        color: 'black',
        fontSize: 20,
        marginTop: 7,
        height: '20%',
    },
    dreamSelBtnsContainer: {
        flexDirection:'row', 
        flexWrap:'wrap',
        justifyContent: 'space-between',
        flex: 1,
        
    },
    dreamSelBtns: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: 'gold',
        width: '35%',
    },
    dreamSelText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "500",
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
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 24,
        elevation: 3,
        backgroundColor: '#835387',
        marginTop: 25,
        flex: 1,
    },
    dreamSetText: {
        color: 'white',
        fontSize: 22,
    },
    startingStats: {
        justifyContent: 'center',
        marginTop: 20,
        flex: 5,
    },
    startingStatsText: {
        fontSize: 20,
    },

})

export default DreamPhaseContainer