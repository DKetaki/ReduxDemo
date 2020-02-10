import React, { Component } from 'react'
import {View, Dimensions,StyleSheet,Image,Text, TextInput, Button,TouchableOpacity} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import LoadingComponent from './LoadingComponent'
export default class LoginComponent extends Component {
    static navigationOptions = ({ navigation })=>{
        return{
            title: '',
            headers: null
        } 
    }
    constructor () {
        super()
        this.state = {isLoading: false, email: 'jm1@example.com', password: 'jay@123' }
        //this.state = {isLoading: false, email: '', password: '' }
    }
    render() {
        return (
            <View> 
             <KeyboardAwareScrollView style={{flex: 1,position: 'absolute'}}>   
             <LoadingComponent isLoading={this.state.isLoading}></LoadingComponent>              
                <View style={{flex: 1}}>                    
                  <Image
                        style = {styles.ImageStyle}
                        source = {require('/Users/ketaki.damale/Documents/React Native/RecipeApp/assets/food.jpg')}
                    > 
                    </Image>
                    <View style = {styles.TriangleStyle}/>
                    <View style = {styles.CircleStyle}>
                        <Text style = {{textAlign: 'center',fontSize: 17,color:'white',fontWeight: 'bold'}}>JM's Kitchen</Text>
                     </View>
                </View>
                <View style = {{justifyContent: 'center',alignContent: 'center',backgroundColor: 'white'}}>
                        <TextInput style = {styles.InputStyle} placeholder = 'Email' value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}>
                    
                        </TextInput>
                        <View style={styles.sepratorLine}></View>
                        <TextInput style = {styles.InputStyle} placeholder = 'Password' secureTextEntry = {true} value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}>

                        </TextInput>
                        <View style={styles.sepratorLine}></View>
                        <TouchableOpacity style={styles.LoginButtonContainer} onPress={this.loginclicked}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                        <Button title = 'Terms & Conditions' onPress={() => this.props.navigation.navigate('TandC')}></Button>
                </View>
             </KeyboardAwareScrollView>
            </View>
        );
    }
    loginclicked = () => {
        this.setState({isLoading: true})
        fetch('http://35.160.197.175:3006/api/v1/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': this.state.email,
                    'password': this.state.password
                })
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    
                }

                this.setState({isLoading: false})
            }).then((responseJSON) => {
                console.log(responseJSON);
                this.props.navigation.replace('home')
                //this.props.navigation.push('Listing', { token:  responseJSON.token})
                this.setState({isLoading: false})
            }).catch((error) => {
                this.setState({isLoading: false})
            })
    }
}
const styles = StyleSheet.create({
    ImageStyle : {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/2 - 20,
        resizeMode: 'cover',
    },
    TriangleStyle : {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: Dimensions.get('window').width,
    borderTopWidth: 100,
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    position: 'absolute',
    transform: [
            {rotate: '180deg'}
          ],
    left: 0,
    bottom: 0
    },
    CircleStyle: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: '#f7495a',
        position: 'absolute',
        left: Dimensions.get('window').width/2 - 50,
        bottom: 0,
        justifyContent: 'center',
        alignContent: 'center'
    },
    InputStyle : {
        padding: 10,
        margin: 10,
        height: 60,
        width: '80%',
        alignSelf: 'center'
    },
    sepratorLine: {
        width: '80%',
        height: 1,
        backgroundColor: 'grey',
        alignSelf: 'center'
    },
    LoginButtonContainer: {
        top: 20,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#f7495a',
        borderRadius: 5,
        margin: 20
    },
    loginTitle: {
        fontSize: 30,
        fontWeight: '500'
    },
    loginButtonText: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold'
    }
})