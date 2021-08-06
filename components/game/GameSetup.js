import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Pressable } from 'react-native'

import { useSelector } from 'react-redux';

import KeyGen from '../../functions/KeyGen';

import Setup from '../../js/Setup';
import GameState from '../../js/GameState';

import firebase from 'firebase'
import BoardSpaces from '../../js/BoardSpaces';
import store from '../../redux/store';
import Calc from '../../js/Calc';

const JobSelector = (props) => {
    const { playerObj, insurance } = props;
    
        if (playerObj) {
            return (
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
            )
        } else {
            return (<View></View>)
        }

}

export default function GameSetup(props) {
    const { navigation } = props;
    const [setupData, setSetupData] = useState(null);
    const [playerJob, setPlayerJob] = useState(null);
    const [playerObj, setPlayerObj] = useState(null);
    const [gameId, setGameId] = useState(null);
    const [insurance, setInsurance] = useState(false);

    const getInsuranceBtnColor = (ins) => {
        var bgColor = '#fdd1d1'; //light red
        if (ins === true) {
            bgColor = '#fdf2c7' //light gold
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
        newPlayer.key = GameState.currentPlayer;

        // Save player object to state
        setPlayerObj(newPlayer);

        // Clear players array 
        if (GameState.currentPlayer === 0){
            GameState.players = [];
        }

        // Clear players from board
        for (var i = 0; i < BoardSpaces.length; i++){
           BoardSpaces[i].players = []
        }

        // Add player to players array
        GameState.players.push(newPlayer);

        // Set game id
        var newGameId = KeyGen.getRandomID(18);
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

        // Update financial statement for first time
        Calc.updateStatement(GameState.currentPlayer);
    }

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

            <Pressable 
                onPress={() => navigation.goBack()}
                style={styles.goBackBtn}
            >
                <Text style={{color: 'black'}}>Go Back</Text>
            </Pressable>

            <JobSelector playerObj={playerObj} insurance={insurance} {...props}/>
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
        fontSize: 18,
        
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

        fontSize: 18,
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


