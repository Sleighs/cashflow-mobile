import { USER_STATE_CHANGE, DATA_STATE_CHANGE } from '../constants' 
import firebase from 'firebase'

export function fetchUser(){
    return((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists){
                    console.log({ fetchUser: snapshot.data() })
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                } else {
                    console.log('user does not exist')
                }
            })
    })
}

export function fetchData(){
    const randNum = Math.floor(Math.random() * 999);

    console.log({
        randNum: randNum
    })

    return((dispatch) => {
        dispatch({
            type: DATA_STATE_CHANGE,
            currentData: randNum
        })
    })
}