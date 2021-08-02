import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import GameState from '../../js/GameState';
import { getPayCalc } from '../../redux/reducers/rootReducer';

const PaymentCalc = (props) => {
    const { paymentCalcState, setPaymentCalcState } = props;
    const dispatch = useDispatch()

    if (GameState.paymentCalc.open) {
        //setPaymentCalcState(true)
    }
    
    return(
        <View style={styles.container}>
            <Text>PaymentCalc</Text>
            <Text>{GameState.paymentCalc.type}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Payment</Text>
                <Text>{'${amount}'}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable
                    onPress={()=>{
                        
                    }}>
                    <Text>PAY</Text>
                </Pressable>
                <Pressable
                    onPress={()=>{
                        GameState.paymentCalc.open = false;
                        GameState.paymentCalc.type = null;
                        dispatch(getPayCalc(false))
                        setPaymentCalcState(false)
                    }}>
                    <Text>DONE</Text>
                </Pressable>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'column',
        width: 375,
        height: 300,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        elevation: 5,
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    },
    text: {
        textAlign: 'center',
    },
})


export default PaymentCalc
