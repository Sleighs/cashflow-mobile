import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Pressable } from 'react-native'

import { useSelector } from 'react-redux';

import KeyGen from '../../functions/KeyGen';

import Setup from '../../js/Setup';
import GameState from '../../js/GameState';

import firebase from 'firebase'

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
    
    const store = useSelector(state => state)

    const createPlayer = () => {
        var randScenario = Math.floor(Math.random() * (Setup.scenarioChoices.length - 1));
        
        /*console.log({
            scenario: Setup.scenarioChoices[randScenario],
            randomNum: randScenario
        })*/
        
        // Create player
        var newPlayer = new Setup.newPlayer(Setup.scenarioChoices[randScenario]);
        newPlayer.name = store.userState.currentUser.name;
        if (!insurance) {
            newPlayer.hasInsurance = false;
        } else {
            newPlayer.hasInsurance = true;
        }

        // Save player object to state
        setPlayerObj(newPlayer);

        GameState.players = [];

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

                        console.log('start game', gameId)

                        if (playerObj){
                            
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
                    <View>
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
        backgroundColor: 'teal',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
    },

    startGameBtn: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        elevation: 3,
        marginTop: 10,
        borderRadius: 10,
    },
    startGameText: {
        textAlign: 'center',
        color: 'black',
        
    },
    continueGameBtn: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        elevation: 3,
        marginTop: 10,
        borderRadius: 10,
    },
    continueGameText: {
        textAlign: 'center',
        color: 'black',
    },

    insuranceBtn: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        elevation: 3,
        marginTop: 10,
        borderRadius: 10,
        textAlign: 'center',
    }, 
    createPlayerBtn: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        elevation: 3,
        marginTop: 10,
        borderRadius: 10,
    },
    goBackBtn: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        elevation: 3,
        marginTop: 10,
        borderRadius: 10,
    }
})


