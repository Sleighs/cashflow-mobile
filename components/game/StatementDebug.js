import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { connect, useStore, useSelector, useDispatch } from 'react-redux';
import store from '../../redux/store';
import { getGameData, getPayCalc } from '../../redux/reducers/rootReducer';

import GameState from '../../js/GameState';
import Calc from '../../js/Calc';
import Main from '../../js/Main';
import { PlayCircleOutlineRounded } from '@material-ui/icons';

export default function StatementDebug(props) {
    const player = GameState.players[GameState.currentPlayer]

    const { setRefresh, setTurnPhase } = props

    return(
        <ScrollView style={{
            height: 250,
        }}>
            <View style={styles.assetsContainer}>
                <View style={styles.tableTitleContainer}>
                    <Text style={styles.tableTitle}>Debug</Text>
                    
                </View>
                <View style={styles.row}>
                    <Pressable
                        style={styles.cashBtn}
                        onPress={()=>{
                            player.cash -= 1000
                            setRefresh(true)
                    }}>
                        <Text>-$1000</Text>
                    </Pressable>
                    <Pressable
                        style={styles.cashBtn}
                        onPress={()=>{
                            player.cash += 1000
                            setRefresh(true)
                    }}>
                        <Text>+$1000</Text>
                    </Pressable>
                </View>
                <View style={styles.row}>
                    <Pressable style={styles.doneBtn}
                        onPress={()=>{
                            GameState.turnPhase = 'end';
                            setTurnPhase('end')
                        }}>
                        <Text style={{fontSize: 10}}>Done</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    assetsContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    tableTitleContainer: {
        marginBottom: 5,
        marginTop: 10,
        
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 24,
    },
    cashBtn: {
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'grey',
        textAlign: 'center',
        justifyContent: 'center',
        //alignContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 8,
    },

    doneBtn: {
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'grey',
        textAlign: 'center',
        justifyContent: 'center',
        //alignContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 8,
    },
    
})