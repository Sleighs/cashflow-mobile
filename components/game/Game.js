import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import Board from './Board'
import DreamPhase from './DreamPhase'
import GameState from './GameState'
import Statement from './Statement'

export default function Game({ navigation }) {
    const [dream, setDream] = useState(DreamPhase.currentDream);
    const [phase, setPhase] = useState(null)

    if (phase === null){
        setPhase(GameState.phase)
    }
    
    return (
        <View style={styles.container}>
            {GameState.phase === 'dream selection' ? (
            <View style={styles.dreamSelectionContainer}>
                <Text style={styles.dreamSelTitle}>Choose Dream</Text>
                <Text style={styles.dreamSelTitle2}>{DreamPhase.dreams[DreamPhase.currentDream]}</Text>
                <Text style={styles.dreamSelText}>{DreamPhase.dreamDescriptions[DreamPhase.currentDream]}</Text>
                <View style={styles.dreamSelBtns}>
                    <Button 
                        title="Prev"
                        style={styles.dreamSetBtn}
                        onPress={() => {
                            if (DreamPhase.currentDream === 0) {
                                DreamPhase.currentDream = DreamPhase.dreams.length - 1;
                            } else {
                                DreamPhase.currentDream--;
                            }    
                            setDream(DreamPhase.currentDream)                
                        }}
                    />
                    <Button 
                        title="Next"
                        style={styles.dreamSetBtn}
                        onPress={() => {
                            if (DreamPhase.currentDream === DreamPhase.dreams.length - 1) {
                                DreamPhase.currentDream = 0;
                            } else {
                                DreamPhase.currentDream++;
                            } 
                            setDream(DreamPhase.currentDream)  
                        }}
                    />
                </View>
                <Button
                    title="Select"
                    style={styles.dreamSetBtn}
                    onPress={() => {
                        GameState.players[0].dream = DreamPhase.dreams[DreamPhase.currentDream];
                        GameState.phase = "rat race";
                        setPhase(GameState.phase);
                        console.log('dream selected: ', GameState.players[0].dreams);
                    }}
                />
            </View>
            ) : (<View></View>)}

            {GameState.phase === "rat race" ? (<View>
                <Board />

                <Button 
                    title="home"
                    onPress={() => navigation.navigate("Home")}
                />
                <Button 
                    title="setup"
                    onPress={() => navigation.navigate("GameSetup")}
                />

                <Statement />
            </View>) : (<View></View>)}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#123351',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: '25px',
        color: 'white',
    },
    button: {


    },
    dreamSelectionContainer: {
        backgroundColor: 'white',
        width: '90%',
        height: '50%',
        
    },
    dreamSelBtns: {
        flexDirection:'row', 
        flexWrap:'wrap',
    },
    dreamSetBtn: {
        width: '30%',
    },
    dreamSelTitle: {
        textAlign: 'center'
    },
    dreamSelTitle2: {
        textAlign: 'center'
    },
    dreamSelText: {
    },
})

