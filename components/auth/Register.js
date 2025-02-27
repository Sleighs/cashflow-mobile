import React, { Component } from 'react'
import { render } from 'react-dom'
import { View, Button, TextInput } from 'react-native'
import firebase from 'firebase'

export class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this);
    }
    
    onSignUp(){
        const { email, password, name } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name, email
                    })

                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View>
                <TextInput 
                    placeholder="name"
                    onChangeText={(name) => this.setState({name})}
                    style={{
                        height: 60,
                        width: '80%',
                        fontSize: 16,
                    }}
                />
                <TextInput 
                    placeholder="email"
                    onChangeText={(email) => this.setState({email})}
                    style={{
                        height: 60,
                        width: '80%',
                        fontSize: 16,
                    }}
                />
                <TextInput 
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    style={{
                        height: 60,
                        width: '80%',
                        fontSize: 16,
                    }}
                />
                <Button 
                    onPress= {()=> this.onSignUp()}
                    title="Sign Up"
                />
            </View>
        )
    }
    
}

export default Register;