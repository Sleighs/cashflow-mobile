import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Pressable } from 'react-native'

import { useSelector } from 'react-redux';

import KeyGen from '../../functions/KeyGen';

import Setup from '../../js/Setup';
import GameState from '../../js/GameState';

import firebase from 'firebase'
import BoardSpaces from '../../js/BoardSpaces';
import store from '../../redux/store';

export default function GameSetup({ navigation }) {
    const [setupData, setSetupData] = useState(null);
    const [playerJob, setPlayerJob] = useState(null);
    const [playerObj, setPlayerObj] = useState(null);
    const [gameId, setGameId] = useState(null);
    const [insurance, setInsurance] = useState(false);
    const getInsuranceBtnColor = (ins) => {
        var bgColor = 'red';
        if (ins === true) {
            bgColor = 'gold'
        }
        return bgColor;
    }
    
    const createPlayer = () => {
        var randScenario = Math.floor(Math.random() * (Setup.scenarioChoices.length - 1));
        
        /*console.log({
            scenario: Setup.scenarioChoices[randScenario],
            randomNum: randScenario
        })*/
        
        var state = store.getState()
        
        // Create player
        var newPlayer = new Setup.newPlayer(Setup.scenarioChoices[randScenario]);
        newPlayer.name = state.currentUser.name;
        
        console.log('create user', state)
        
        if (!insurance) {
            newPlayer.hasInsurance = false;
        } else {
            newPlayer.hasInsurance = true;
        }

        newPlayer.cash += newPlayer.startingSalary;

        // Save player object to state
        setPlayerObj(newPlayer);

        // Clear players array
        GameState.players = [];

        // Clear players from board
        for (var i = 0; i < BoardSpaces.length; i++){
           BoardSpaces[i].players = []
        }

        // Add player to players array
        GameState.players.push(newPlayer);

        // Set game id
        var newGameId = KeyGen.getRandomID(18);
        //setGameId(newGameId);
        GameState.gameId = newGameId;

        // Turn on dream phase 
        GameState.gamePhase = 'dream selection';

        // Create first move
        GameState.moves = [
            {
                player: newPlayer.name,
                turn: 1,
                prev: null,
                next: 0,
            }
        ] 

        // Cloud save
        /*if (firebase){
            firebase.db.collection("games").doc(newGameId).set({
                id: newGameId,
                players: GameState.players,
                dateCreated: "00:00"
            })
            .then(() => {
                console.log("Game successfully saved!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        })*/

        
    }

    useEffect(() => {
        var newGameId = KeyGen.getRandomID(18);

        //setGameId(newGameId);
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Game Setup</Text>
            <View>
                <Pressable 
                    onPress={() =>{
                        if (!playerObj){
                            createPlayer();
                        }

                        navigation.navigate("Game")
                    }}
                    style={styles.startGameBtn}
                >
                    <Text style={styles.startGameText}>Start Game</Text>
                </Pressable>
                <Pressable 
                    onPress={() =>{
                        console.log('continue game')
                        //navigation.navigate("Game")
                    }}
                    style={styles.continueGameBtn}
                    color="#435324"
                >
                    <Text style={styles.continueGameText}>Continue Game</Text>
                </Pressable>
            </View>
            <View>
                <Pressable 
                    onPress={() => {
                        if (!insurance) {
                            setInsurance(true)
                        } else {
                            setInsurance(false)
                        }
                    }}
                    style={[styles.insuranceBtn, {backgroundColor: getInsuranceBtnColor(insurance)}]}
                    
                >
                    <Text>Insurance</Text>
                </Pressable>
                <Pressable 
                    onPress={() => {
                        createPlayer();
                        
                        console.log('player created', playerObj);
                    }}
                    style={styles.createPlayerBtn}
                >
                    <Text>Create Player</Text>
                </Pressable>

            </View>
            
            <View>
                <Text style={styles.optionsTitle}>Options</Text>
            </View>

            <Pressable 
                onPress={() => navigation.goBack()}
                style={styles.goBackBtn}
            >
                <Text style={{color: 'black'}}>Go Back</Text>
            </Pressable>

            {!playerObj ? (
                    <View></View>
                ) : (
                    <View style={{
                        backgroundColor: "white",
                        padding: 10,
                    }}>
                        <Text style={{textTransform: 'capitalize'}}>Name: {playerObj.name}</Text>
                        <Text>JobTitle: {playerObj.jobTitle}</Text>
                        <Text>Salary: {playerObj.startingSalary}</Text>
                        <Text>Savings: {playerObj.startingSavings}</Text>
                        <Text>Insurance:{!insurance ? ' None' : ' Insured'}</Text>
                    </View>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5eee3',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: 'gray',
    },

    startGameBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        marginTop: 15,
    },
    startGameText: {
        textAlign: 'center',
        color: 'black',
        
    },
    continueGameBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        marginTop: 15,
    },
    continueGameText: {
        textAlign: 'center',
        color: 'black',
    },

    insuranceBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        marginTop: 15,
    }, 
    createPlayerBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        marginTop: 15,
    },
    goBackBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        marginTop: 15,
    }
})


