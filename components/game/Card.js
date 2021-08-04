import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux';
import { getGameData } from '../../redux/reducers/rootReducer';

import BoardSpaces from '../../js/BoardSpaces';
import GameState from '../../js/GameState';
import Main from '../../js/Main';

import PaymentCalc from './PaymentCalc';
import RollButton from './RollButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RollPhase = (props) => {
    const { rolled, setRolled, turnPhase, setTurnPhase } = props;

    const player = GameState.players[GameState.currentPlayer];
    //console.log('card player', GameState.players[GameState.currentPlayer])

    const  dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGameData(GameState))
    })

    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{GameState.players[GameState.currentPlayer].name}'s Turn</Text>
                <Text>When You are ready, roll the die and take your turn</Text>
                <Text>Before you start your turn, review your financial statement. You may also use this time to repay liabilities or borrow money.</Text>
            </View>
            <View style={styles.btnContainer}>
                <RollButton 
                    {...props}
                    type={'normal'} 
                    rolled={rolled} 
                    setRolled={setRolled}
                    turnPhase={turnPhase} 
                    setTurnPhase={setTurnPhase}
                />
                {player.charityTurns > 0 ? 
                    <RollButton 
                        {...props}
                        type='double' 
                        rolled={rolled} 
                        setRolled={setRolled}
                        turnPhase={turnPhase} 
                        setTurnPhase={setTurnPhase}
                    /> : <View></View>}
            </View>
        </View>
    )
}

const MidPhase = (props) => {
    const { cardType, cardInfo, setCardInfo, turnPhase, setTurnPhase } = props;

    const player = GameState.players[GameState.currentPlayer];

    const [title, setTitle] = useState('');
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');
    const [description3, setDescription3] = useState('');
    const [cost, setCost] = useState('');

    useEffect(() => {
        setCardInfo(GameState.midPhaseInfo );
        setTitle(cardInfo.title)
        setDescription1(cardInfo.description1)
        setDescription2(cardInfo.description2)
        setDescription3(cardInfo.description3)
        setCost(cardInfo.cost)
    })

    //get space type 
        /* 
        child
        doodad
        payday
        downsize
        offer
        opportunity
        charity
         */


    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text>{description1}</Text>
                <Text>{description2}</Text>
                <Text>{description3}</Text>
                <Text>{cost}</Text>
            </View>
            <View style={styles.btnContainer}>
                <Text style={styles.diceAmount}>Dice: {!GameState.diceAmount ? '': GameState.diceAmount}</Text>
                
                {cardType === 'OPPORTUNITY' ? (
                    <View style={styles.oppBtnContainer}>
                        <Pressable style={styles.oppBtn}
                            onPress={() => {
                                Main.getSmallDeal()
                                console.log('small opp clicked')
                                GameState.turnPhase = 'deal';
                                setTurnPhase('deal')
                                console.log('small opp clicked')
                            }}>
                            <Text>SMALL</Text>
                        </Pressable>
                        <Pressable style={styles.oppBtn}
                            onPress={() => {
                                Main.getLargeDeal()
                                GameState.turnPhase = 'deal';
                                setTurnPhase('deal')
                                console.log('big opp clicked')
                            }}>
                            <Text>BIG</Text>
                        </Pressable>
                    </View>
                ) : (<View></View>)}
                {cardType === 'DOODAD' ? (
                    <View>
                        <Pressable style={styles.payBtn}
                            onPress={() =>{
                                console.log('doodad clicked')
                            }}>
                            <Text>PAY</Text>
                        </Pressable>
                    </View>
                ) : (<View></View>)}
                {cardType === 'CHARITY' ? (
                    <View>
                        <Pressable style={styles.donateBtn}
                            onPress={() =>{
                                console.log('donate clicked')
                            }}>
                            <Text>DONATE</Text>
                        </Pressable>
                    </View>
                ) : (<View></View>)}
                {(cardType === 'CHILD') || (cardType === 'PAYDAY') ? (
                    <View>
                        <Pressable style={styles.continueBtn}
                            onPress={() =>{
                                setTurnPhase('end');
                            }}>
                            <Text style={{fontSize: 10}}>CONTINUE</Text>
                        </Pressable>
                    </View>
                ) : (<View></View>)}
                {cardType === 'DOWNSIZE' ? (
                    <View>
                        <Pressable style={styles.downsizeBtn}
                            onPress={() =>{
                                
                            }}>
                            <Text>PAY</Text>
                        </Pressable>
                    </View>
                ) : (<View></View>)}
                
                <Pressable style={[styles.continueBtn, {
                    backgroundColor: '#e7d4d4',
                }]}
                    onPress={() =>{
                        GameState.turnPhase = 'end';
                        setTurnPhase('end');
                    }}>
                    <Text style={{
                        fontSize: 8,
                    }}>CONTINUE</Text>
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
        */

    })

    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Deal</Text>
                <Text style={styles.cardDescription}></Text>
            </View>
            <View style={styles.btnContainer}>
                <Text></Text>
                <Pressable style={styles.continueBtn}
                    onPress={()=>{
                        GameState.turnPhase = 'end';
                        setTurnPhase('end')
                    }}>
                    <Text style={{fontSize: 10}}>Continue</Text>
                </Pressable>
            </View>
            
        </View>
    )
}

const EndPhase = (props) => {
    const { setTurnPhase } = props;

    const  dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGameData(GameState))
    })

    return(
        <View style={styles.endContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>FINISH YOUR TURN</Text>
                <Text style={styles.cardDescription}>Before you end your turn, review your financial statement. You may also use this time to review your deals.</Text>
            
                <View style={{
                    paddingHorizontal: 25,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Pressable style={styles.repayBtn}>
                        <Text>Repay</Text>
                    </Pressable>
                    <Pressable style={styles.borrowBtn}>
                        <Text>Borrow</Text>
                    </Pressable>
                    
                </View>
            </View>
            <View style={styles.btnContainer}>

                <Text style={styles.diceAmount}>Dice: {!GameState.diceAmount ? '': GameState.diceAmount}</Text>
                <Pressable style={styles.endBtn} 
                    onPress={()=>{
                        Main.nextTurn();
                        setTurnPhase('roll')
                    }}>
                    <Text>END TURN</Text>
                </Pressable>
            </View>
        </View>
    )
}

const Card = (props) => {
    const player = GameState.players[GameState.currentPlayer];
    const { setCardInfo } = props;

    useEffect(()=>{
        if (GameState.turnPhase === 'middle'){
            //setTurnPhase(GameState.turnPhase);
            setCardInfo(GameState.midPhaseInfo );
        }
    })
    
    return(
        <View style={styles.cardContainer}>
            <View style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 20,
                margin: 5,
            }}>
                <Text style={{font: 'gray'}}>cash: ${Main.numWithCommas(player.cash)}</Text>
                <Text style={{font: 'gray'}}>payday: ${Main.numWithCommas(player.payday)}</Text>
            </View>
         
            {GameState.paymentCalc.open ? <PaymentCalc {...props} /> :
                GameState.turnPhase === 'roll' ? <RollPhase {...props} /> : 
                    GameState.turnPhase === 'middle' ? <MidPhase {...props} /> : 
                        GameState.turnPhase === 'deal' ? <Deal type={GameState.currentDeal ? GameState.currentDeal.type : 'none'} {...props} /> :
                            <EndPhase {...props} />
            }
        </View>    
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        alignContent: 'center',
        
        flex: 6,
        width: '100%',
        //height: 350,
        //maxHeight: 350,
        borderRadius: 15,
        margin: 5,
        
    },
    container: {
        backgroundColor: "#ffffff",
        height: 300,
    },
    endContainer: {

        
    },
    cardTitle: {
        textTransform: 'capitalize',
        fontSize: 26,
        fontWeight: "500",
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 4,
    },
    cardDescription: {

    },
    diceAmount: {
        fontSize: 20,
        
    },
    btnContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        minHeight: 70,

    },
    oppBtnContainer: {
        
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        
        minHeight: 70,
        paddingHorizontal: 20,
    },
    oppBtn: {
        backgroundColor: '#e2ebe0',
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        width: 65,
        
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        height: 40,
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
    donateBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    },
    downsizeBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    }, 
    continueBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        width: 65,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    },
    endBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        height: 40,
        alignContent: 'center',
    },
    borrowBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        paddingHorizontal: 30,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        height: 40,
        alignContent: 'center',
    },
    repayBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        paddingHorizontal: 30,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        height: 40,
        alignContent: 'center',
    },
})

export default Card