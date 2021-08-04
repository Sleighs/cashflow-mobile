import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { connect, useStore, useSelector, useDispatch } from 'react-redux';
import store from '../../redux/store';
import { getGameData, getPayCalc } from '../../redux/reducers/rootReducer';

import GameState from '../../js/GameState';
import Calc from '../../js/Calc';
import Main from '../../js/Main';

const Summary = (props) => {
    const player = GameState.players[GameState.currentPlayer];

    return (
        <ScrollView style={{
            height: 250,
        }}>
            <View style={styles.tabContainer}>
                <View>
                    <View style={styles.summaryTableTitleContainer}>
                        <Text style={styles.tableTitle}>Summary</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryText, {color: 'darkgreen'}]}>Cash</Text>
                        <Text> ${Main.numWithCommas(player.cash)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryText}>Total Income</Text> 
                        <Text>${Main.numWithCommas(Calc.totalIncome(player.key))}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryText}>Total Expenses</Text> 
                        <Text>${Main.numWithCommas(Calc.totalExpenses(player.key))}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryText}>Payday</Text> 
                        <Text>${Main.numWithCommas(player.payday)}</Text>
                    </View>
                               
                </View>
                <View>
                    <View style={styles.tableTitleContainer}>
                        <Text style={styles.tableTitle}>Income</Text>
                    </View>
                    {player.income.map(item => 
                        <View key={item.type} style={styles.incomeRow}>
                            <Text style={styles.incomeName}>{item.type} </Text>
                            <Text style={styles.incomeAmount}>${Main.numWithCommas(item.amount)}</Text>
                        </View>
                    )}
                </View>
                <Expenses {...props}/>

            </View>
        </ScrollView>
    )
}

const Assets = (props) => {
    const player = GameState.players[GameState.currentPlayer];
    /* tab navigator
        - property
            - developed land
            - undeveloped land
            - coins
            - cd
        - stocks
            - mutuals
            - preferred
            - stock
        - businesses
            - company
            - limited partnership
            - automated business


    */

    return (
        <ScrollView style={{
            height: 250,
        }}>
            <View style={styles.tabContainer}>
                <Text>Assets</Text>
            </View>
        </ScrollView>
    )
}

const Expenses = (props) => {
    const { 
        paymentCalcState, 
        setPaymentCalcState, 
        payCalcType,
        setPayCalcType 
    } = props;
    const player = GameState.players[GameState.currentPlayer];
    const dispatch = useDispatch()
    const stuff = useSelector(state => state.paymentCalc)

    return (
        <View style={styles.expensesContainer}>
            <View style={styles.tableTitleContainer}>
                <Text style={styles.tableTitle}>Expenses</Text>
            </View>
            <View style={styles.expensesRow}>
                <Text style={styles.expensesName}>Taxes</Text>
                <Text style={styles.expensesCost}>${Main.numWithCommas(player.taxes)}</Text>
            </View>
            {player.expenses.map(item => 
                <View key={item.type} style={styles.expensesRow}>
                    <Text style={styles.expensesName}>{item.type}</Text>
                    <Text style={styles.expensesCost}>${Main.numWithCommas(item.payment)}</Text>
                </View>
            )}
            {player.children > 0? 
                <View style={styles.expensesRow}>
                    <Text style={styles.expensesName}>Children {'(' + String(player.children) + 'x)'}</Text>
                    <Text style={styles.expensesCost}>${Main.numWithCommas(player.childExpense)}</Text>
                </View> 
                : <View></View>
            }
            <View style={styles.summaryRow}>
                        <Text style={styles.summaryText}>Insurance</Text> 
                        <Text>${!player.hasInsurance ? '0' : Main.numWithCommas(GameState.getInsuranceCost(GameState.currentPlayer))}</Text>
                    </View> 
            <View style={styles.expensesRow}>
                <Text style={styles.expensesName}>Other Expenses</Text>
                <Text style={styles.expensesCost}>${Main.numWithCommas(player.otherExpenses)}</Text>
            </View>
            <View style={styles.tableTitleContainer}>
                <Text style={styles.tableTitle}>Loans</Text>
            </View>
            {player.expenses.map(item => 
                <TouchableOpacity
                    key={item.type}
                    name={item.type}
                    onPress={() => {
                        GameState.paymentCalc.open = true;
                        GameState.paymentCalc.type = item.type;
                        
                        dispatch(getPayCalc(item.type))

                        //console.log('stuff', stuff)

                        if (GameState.paymentCalc.open === true){
                            setPayCalcType(item.type)
                        } else {
                            setPaymentCalcState(true)
                        }
                    }}
                    >
                    <View style={styles.expensesRow}>
                        <Text style={styles.expensesName}>{item.type}:</Text>
                        <Text style={styles.expensesCost}>${Main.numWithCommas(item.cost)}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    )
}

const StatementTab = createMaterialTopTabNavigator();

function StatementTabs(props) {
  return (
    <StatementTab.Navigator
        initialRouteName="Summary"
        initialLayout={{ 
            width: '100%', 
        }}
    >
        <StatementTab.Screen 
            name="Summary"  
            children={() => <Summary {...props} />}
        />
        <StatementTab.Screen 
            name="Assets" 
            children={() => <Assets {...props} />}
         />
    </StatementTab.Navigator>
  );
}

const Statement = (props) => {
    const { data, setData } = props;
    const [loaded, setLoaded] = useState(false)
    const player = GameState.players[GameState.currentPlayer];
    const dispatch = useDispatch();
    
    if (!loaded){
        //dispatch(getGameData(GameState))
        //setLoaded(true)
        //console.log('statement props', props)
        //setData(GameState)
    }

    return(
        <View style={styles.statementContainer}>            
            <StatementTabs {...props}/>
        </View>   
    )
}

const styles = StyleSheet.create({
    statementContainer: {
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignContent: 'center',
        //alignItems: 'center',
        //flexDirection: 'row',
        flex: 6,
        maxWidth: Dimensions.get('window').width,
        width: '100%',
        borderRadius: 15,
    },
    statementHeader: {
        backgroundColor: '#f2f1f7',
        height: 25,
        //width: 100,
        borderRadius: 12,
        fontSize: 16,
    },
    tabContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        
    },
    tableTitleContainer: {
        marginBottom: 5,
        marginTop: 10,
        
    },
    summaryTableTitleContainer: {
        marginBottom: 5,
        marginTop: 5,
        
    },
    tableTitle: {
        fontSize: 18, 
        color: '#616161',
    },

    // summary table
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        //borderBottomColor: '#ffffff',
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
    },
    summaryText: {
        textTransform: 'capitalize',
        fontSize: 16,
    },
    
    // income table
    incomeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        //borderBottomColor: '#ffffff',
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
    },
    incomeName: {
        textTransform: 'capitalize',
        fontSize: 16,
    },
    incomeAmount: {
        fontSize: 16,
    },
    // assets

    // expenses table
    expensesContainer: {
        marginVertical: 5,
    },
    expensesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
    },
    expensesName: {
        textTransform: 'capitalize',
        fontSize: 16,
    },
    expensesCost: {
        fontSize: 16,
    },
    liabilitiesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        //borderBottomColor: '#ffffff',
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
    },
    liabilitiesName: {
        textTransform: 'capitalize',
        fontSize: 16,
    },
    liabilitiesCost: {
        fontSize: 16,
    },
})

export default Statement