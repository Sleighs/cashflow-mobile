import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'

import GameState from '../../js/GameState';
import Main from '../../js/Main';
import Calc from '../../js/Calc';

const Stock = (props) => {   
    const { type, setTurnPhase, setRefresh } = props

    const [sharesOwned, setSharesOwned] = useState(0)
    const [sharePrice, setSharePrice] = useState(null)
    const [shareAmount, setShareAmount] = useState(10)

    const stock = GameState.currentDeal

    

    useEffect(() => {

        let stockAssetsSearch = player.stockAssets.find(item => {

            if (item && item.type === type && item.price === price){
                setSharesOwned(item.shares)
            } 

        })
        //check shares owned
        setSharePrice(GameState.currentDeal.price)
        //setShareAmount(GameState.currentDeal.amount)

    })



    return (
        <View style={styles.stockContainer}>
            <View style={styles.stockTextContainer}>
                <Text>{stock.type}</Text>
                <Text>{stock.name}</Text>
                <Text>{stock.description}</Text>
                <Text>Cost: ${stock.price}</Text>
                <Text>Trading Range: {stock.range}</Text>
                <Text>Shares Owned: {sharesOwned}</Text>
            </View>
            
            <View style={styles.btnContainer}>
                <Pressable style={styles.buySharesBtn}>
                    <Text>+10</Text>
                </Pressable>
                <Pressable style={styles.buySharesBtn}>
                    <Text>+100</Text>
                </Pressable>
                <Pressable style={styles.buySharesBtn}>
                    <Text>+1000</Text>
                </Pressable>
            </View>

            <View style={styles.btnContainer}>
                <Pressable style={styles.buySharesBtn}
                    onPress={() => {
                        console.log(GameState.currentPlayer, type, sharePrice, shareAmount)
                        Calc.buyStock(GameState.currentPlayer, type, sharePrice, shareAmount)

                        setRefresh(true)
                    }}>
                    <Text>Buy</Text>
                </Pressable>
                
                <Pressable
                    style={styles.doneBtn}
                    onPress={()=>{
                        GameState.turnPhase = 'end';
                        setTurnPhase('end')
                    }}>
                    <Text>Done</Text>
                </Pressable>
            </View>
        </View>
    )
}

const RealEstate = (props) => {
    const { type } = props

    return (
        <View>
            <Text>{type}</Text>

            <View style={styles.btnContainer}>
                <Pressable style={styles.payBtn}
                    onPress={() => {
                        
                    }}>
                    <Text>Buy</Text>
                </Pressable>
                <Pressable style={styles.doneBtn}
                    onPress={()=>{
                        GameState.turnPhase = 'end';
                        setTurnPhase('end')
                    }}>
                    <Text style={{fontSize: 10}}>Done</Text>
                </Pressable>
            </View>
        </View>
    )
}

const Deal = (props) => {
    const { setTurnPhase , type } = props;

    useEffect(()=>{
        
        /*
        mutual
        
        type
        name
        description
        rule
        symbol
        price
        range
        divend
        id
        shares

        types
            mutual
            stock
            stock split
            reverse split
            preferred stock
            real estate
            property damage
            coin
            cd
            company

        */



        console.log('deal type: ', type)

    })

    // 

    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {type === "Mutual Fund" || type === "Stock" 
                    ? <Stock type={type} {...props} /> 
                    : type === "Real Estate" 
                        ? <RealEstate type={type} {...props} /> 
                        : <View><Text>Deal - {type}</Text></View>}
            </View>
        </View>
    )
}

export default Deal


const styles = StyleSheet.create({
    cardContainer: {
        justifyContent: 'center',
        width: '100%',
        marginVertical: 5,
    },
    container: {
        //backgroundColor: "#ffffff",
        height: 300,
        paddingHorizontal: 30,
        paddingVertical: 20,
        justifyContent: 'space-between'
    },
    cardTitle: {
        textTransform: 'capitalize',
        fontSize: 26,
        fontWeight: "500",
        marginBottom: 15,
    },
    textContainer: {

    },
    stockTextContainer: {
        marginBottom: 15,
    },
    cardDescription: {

    },

    diceAmount: {
        fontSize: 20,
        marginRight: 15,
        
    },
    btnContainer: {
        flexDirection: 'row',
        //flex: 1,
        justifyContent: 'space-between',
        height: 60,

    },
    
    // Buttons
    buySharesBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    },
    payBtn: {
        
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    },
    doneBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    },

    // Stock 
    stockContainer: {

    },

})