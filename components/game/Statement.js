import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import GameState from './GameState';

const Assets = () => {

}
const Liabilities = () => {

}

const Statement = ({ playerObj }) => {
    console.log('statement: ', playerObj);

    return(
        <View style={styles.statementContainer}>
            <View>
                <Text>Name: {playerObj.name}</Text>
                <Text>JobTitle: {playerObj.jobTitle}</Text>
                <Text>Salary: {playerObj.startingSalary}</Text>
                <Text>Savings: {playerObj.startingSavings}</Text>
                <Text>Insurance: {!playerObj.hasInsurance ? 'None' : 'Insured'}</Text>
            </View>
            <View style={}></View>
        </View>    
    )
}

const styles = StyleSheet.create({
    statementContainer: {
        backgroundColor: "#ffffff",
    }
})

export default Statement