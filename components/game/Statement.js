import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import GameState from '../../js/GameState';

const Assets = () => {
    return (
        <View>
            <Text>Assets</Text>
            
        </View>
    )
}
const Liabilities = () => {
    return (
        <View>
            <Text>Liabilities</Text>
        </View>
    )
}

const Statement = ({ playerObj }) => {
    console.log('statement: ', playerObj);

    return(
        <View style={styles.statementContainer}>
            <View>
                <Text style={{textTransform: 'capitalize'}}>Name: {playerObj.name}</Text>
                <Text>JobTitle: {playerObj.jobTitle}</Text>
                <Text>Salary: {playerObj.startingSalary}</Text>
                <Text>Savings: {playerObj.startingSavings}</Text>
                <Text>Insurance: {!playerObj.hasInsurance ? 'None' : 'Insured'}</Text>
            </View>
            <Assets />
            <Liabilities />
        </View>    
    )
}

const styles = StyleSheet.create({
    statementContainer: {
        backgroundColor: "#ffffff",
    },
})

export default Statement