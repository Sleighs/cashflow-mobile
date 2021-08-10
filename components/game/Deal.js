import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'

import GameState from '../../js/GameState';
import Main from '../../js/Main';
import Calc from '../../js/Calc';

const Stock = (props) => {   
    const { type, setTurnPhase, setRefresh } = props

    const [sharesOwned, setSharesOwned] = useState(0)
    const [sharePrice, setSharePrice] = useState(null)
    const [shareAmount, setShareAmount] = useState(0)
    const [buyBtns, setBuyBtns] = useState(false)
    const [sellBtns, setSellBtns] = useState(false)

    const stock = GameState.currentDeal;
    const player = GameState.players[GameState.currentPlayer];

    

    useEffect(() => {

        let stockAssetsSearch = player.stockAssets.find(item => {

            if (item && item.type === type && item.price === GameState.currentDeal.price){
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
                {
                    !buyBtns 
                    ? <Text></Text> 
                    : <Text>Purchase {shareAmount} at ${stock.price} for ${Main.numWithCommas(shareAmount * stock.price)}?</Text>
                }
                {
                    !sellBtns 
                    ? <Text></Text> 
                    : <Text>Sell {shareAmount} at ${stock.price} for ${Main.numWithCommas(shareAmount * stock.price)}?</Text>
                }
                
            </View>
            
            <View style={styles.sharesBtnContainer}>
                {!buyBtns 
                ? <View></View> 
                : <View style={{
                    flexDirection: 'row',
                }}>
                    <Pressable style={styles.buySharesBtn}
                        onPress={() => {
                            if (shareAmount - 100 > 0){
                                setShareAmount(shareAmount - 100)
                            }
                        }}>
                        <Text>-100</Text>
                    </Pressable>
                    <Pressable style={styles.buySharesBtn}
                        onPress={() => {
                            if (shareAmount - 10 > 0){
                                setShareAmount(shareAmount - 10)
                            }
                        }}>
                        <Text>-10</Text>
                    </Pressable>
                    <Pressable style={styles.buySharesBtn}
                        onPress={() => {
                            if ((shareAmount + 10) * stock.price < player.cash){
                                setShareAmount(shareAmount + 10)
                            }
                        }}>
                        <Text>+10</Text>
                    </Pressable>
                    <Pressable style={styles.buySharesBtn}
                        onPress={() => {
                            if ((shareAmount + 100) * stock.price < player.cash){
                                setShareAmount(shareAmount + 100)
                            }
                        }}>
                        <Text>+100</Text>
                    </Pressable>
                    <Pressable style={styles.buySharesBtn}
                        onPress={() => {
                            console.log(GameState.currentPlayer, type, sharePrice, shareAmount)

                            if (shareAmount > 0 && player.cash >= (sharePrice * shareAmount)){
                                Calc.buyStock( GameState.currentPlayer, type, sharePrice, shareAmount) 
                            } else {
                                console.log('cannot afford stockpurchase')
                            }

                            setBuyBtns(false)
                            setSellBtns(false)

                            setRefresh(true)
                        }}>
                        <Text>Purchase</Text>
                    </Pressable>
                </View>}    

                {!sellBtns 
                ? <View></View> 
                : <View style={{
                    flexDirection: 'row',
                }}>
                    <Pressable style={styles.buySharesBtn}
                        onPress={() => {
                            if (shareAmount - 100 > 0){
                                setShareAmount(shareAmount - 100)
                            }
                        }}>
                        <Text>-100</Text>
                    </Pressable>
                    <Pressable style={styles.buySharesBtn}
                        onPress={() => {
                            if (shareAmount - 10 > 0){
                                setShareAmount(shareAmount - 10)
                            }
                        }}>
                        <Text>-10</Text>
                    </Pressable>
                    <Pressable style={styles.buySharesBtn}
                        onPress={() => {
                            if ((shareAmount + 10) <= sharesOwned){
                                setShareAmount(shareAmount + 10)
                            }
                        }}>
                        <Text>+10</Text>
                    </Pressable>
                    <Pressable style={styles.buySharesBtn}
                        onPress={() => {
                            if ((shareAmount + 100) <= sharesOwned){
                                setShareAmount(shareAmount + 100)
                            }
                        }}>
                        <Text>+100</Text>
                    </Pressable>

                    {
                        //map stock assets and display button for each 
                        player.stockAssets.map((item, i) => {

                            if (item && item.symbol === stock.symbol){
                                return (
                                    <Pressable style={styles.buySharesBtn}
                                        key={i}
                                        onPress={() => {
                                            console.log(GameState.currentPlayer, type, sharePrice, shareAmount)
                                            Calc.sellStock(GameState.currentPlayer, type, shareAmount, item.price, sharePrice,)
                                            
                                            setBuyBtns(false)
                                            setSellBtns(false)
    
                                            setRefresh(true)
                                        }}>
                                        <Text>Sell {shareAmount}x for {shareAmount * sharePrice}</Text>
                                    </Pressable>
                                )
                            } else {
                                return (<View></View>)
                            }
                        })
                    }
                </View>}
            </View>

            <View style={styles.btnContainer}>
                <Pressable style={(!buyBtns ? styles.buySharesBtn : styles.buySharesOnBtn)}
                    onPress={() => {
                        console.log(GameState.currentPlayer, type, sharePrice, shareAmount)
                        
                        if (!buyBtns){
                            setBuyBtns(true)
                        } else {
                            setBuyBtns(false)
                        }   
                        
                        setSellBtns(false)

                        setRefresh(true)
                    }}>
                    <Text>Buy</Text>
                </Pressable>

                {sharesOwned 
                ? <Pressable style={(!sellBtns ? styles.sellSharesBtn : styles.sellSharesOnBtn)}
                    onPress={() => {
                        console.log(GameState.currentPlayer, type, sharePrice, shareAmount)
                        
                        if (!sellBtns){
                            setSellBtns(true)
                        } else {
                            setSellBtns(false)
                        }   

                        setBuyBtns(false)

                        setRefresh(true)
                    }}>
                    <Text>Sell</Text>
                </Pressable>
                : <View></View>}
                
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
    sharesBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        color: 'darkgreen',
    },
    buySharesOnBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'green',
        color: 'white',
    },
    sellSharesBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        color: 'darkgreen',
    },
    sellSharesOnBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'green',
        color: 'white',
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