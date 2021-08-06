import React, { Component } from 'react'
import { render } from 'react-dom'
import { View, Button, TextInput } from 'react-native'
import firebase from 'firebase'

export class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onSignIn = this.onSignIn.bind(this);
    }
    
    onSignIn(){
        const { email, password } = this.state
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View style={{
                justifyContent: 'center',
            }}>
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
                        width: '60%',
                        fontSize: 16,
                    }}
                />
                <Button 
                    onPress= {()=> this.onSignIn()}
                    title="Sign In"
                />
            </View>
        )
    }
    
}

export default Login;