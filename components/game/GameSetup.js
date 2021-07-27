import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import KeyGen from '../../functions/KeyGen';
import Setup from '../../functions/setup';
import GameState from './GameState';

import firebase from 'firebase'
import { useSelector } from 'react-redux';


export default function GameSetup({ navigation }) {
    const [setupData, setSetupData] = useState(null);
    const [playerJob, setPlayerJob] = useState(null);
    const [playerObj, setPlayerObj] = useState(null);
    const [gameId, setGameId] = useState(null);
    const [insurance, setInsurance] = useState(false);
    
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
        GameState.phase = 'dream selection';

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
                <Button 
                    onPress={() =>{
                        if (!playerObj){
                            createPlayer();
                        }

                        console.log('start game', gameId)

                        navigation.navigate("Game")
                    }}
                    style={styles.startGameButton}
                    title="Start Game"
                />
                <Button 
                    onPress={() =>{
                        console.log('continue game')
                        //navigation.navigate("Game")
                    }}
                    style={styles.continueGameButton}
                    title="Continue Game"
                    color="#435324"
                />
            </View>
            <View>
                {!playerObj ? (
                    <View></View>
                ) : (
                    <View>
                        <Text>Name: {playerObj.name}</Text>
                        <Text>JobTitle: {playerObj.jobTitle}</Text>
                        <Text>Salary: {playerObj.startingSalary}</Text>
                        <Text>Savings: {playerObj.startingSavings}</Text>
                        <Text>Insurance:{!insurance ? ' None' : ' Insured'}</Text>
                    </View>
                )}
                <Button 
                    onPress={() => {
                        if (!insurance) {
                            setInsurance(true)
                        } else {
                            setInsurance(false)
                        }
                    }}
                    style={styles.button}
                    title="Insurance"
                    color={!insurance ? "red" : "gold"}
                />
                <Button 
                    onPress={() => {
                        createPlayer();
                        
                        console.log('player created', playerObj);
                    }}
                    style={styles.button}
                    title="Create Player"
                    color="#111213"
                />

            </View>
            
            <View>
                <Text style={styles.optionsTitle}>Options</Text>
                <View accessibilityRole='checkbox'></View>
            </View>
            <Button 
                onPress={() => navigation.goBack()}
                title="Back"
                color="#212212"
            />
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
        fontSize: '25px',
        color: 'white',
    },
    startGameButton: {
        color: 'white',
        marginTop: '25%',
    },
    continueGameButton: {
        width: 200,
        height: 100,
        color: 'white',
    },
    optionsTitle:{

    },
    button: {

    }
})


