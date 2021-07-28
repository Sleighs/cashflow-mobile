import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CashFlowJs</Text>
            <Pressable 
                onPress={() => navigation.navigate("GameSetup")}
                style={styles.singlePlayerBtn}
            >
                <Text style={styles.singlePlayerText}>Single Player</Text>
            </Pressable>
            <Pressable 
                onPress={() => console.log('options selected')}
                style={styles.optionsBtn}
            >
                <Text style={styles.optionsText}>Options</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'darkgreen',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
    },
    singlePlayerBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        marginTop: 15,
    },
    singlePlayerText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
    optionsBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        marginTop: 10,
    },
    optionsText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
})

