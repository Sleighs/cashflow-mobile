import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CashFlowJs</Text>
            <Button 
                onPress={() => navigation.navigate("GameSetup")}
                style={styles.newGameButton}
                title="Single Player"
                color="#241285"
            />
            <Button 
                onPress={() => console.log('options selected')}
                style={styles.optionsButton}
                title="Options"
                color="#241285"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: '25px',
        color: 'white',
    },
    newGameButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        color: 'white',
        marginTop: '25%',
        height: '40px',
        width: '160px',
    },
    optionsButton: {
        
    },
})

