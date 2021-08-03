import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useStore } from 'react-redux'
import GameState from '../../js/GameState';

const GameStateInfo = (props) => {
    const { data } = props

    return(
        <View style={{
            fontSize: 16, 
            justifyContent: 'center',
            margin: 20,
        }}>
            {data.map(item =>
                <View>
                    <Text>{item}</Text>
                </View>
            )}
        </View>
    )
}


export default function Debug() {
    var string = JSON.stringify(GameState)
    var arr = []

    const [refresh, setRefresh] = useState(false)

    const getInfo = (state) => {
        var newArr = [];
        var keys = Object.keys(state)
        
        for (var i = 0; i < state.length; i++) {
            newArr.push(state[keys[i]])
        }

        arr = newArr
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Debug</Text>
            <Pressable style={{
                    paddingHorizontal: 40,
                    paddingVertical: 20,
                    backgroundColor: 'lightblue',
                }}
                onPress={()=>{
                    getInfo(GameState)

                    if (!refresh){
                        setRefresh(true) 
                    } else {
                        setRefresh(false)
                    }

                    console.log('debug refreshed')      
                }}>
                <Text>Refresh</Text>
            </Pressable>
            <ScrollView style={{
                height: '50%',
            }}>
                <GameStateInfo data={arr}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        color: 'black',
    },
    debug1: { 
        
    },
})