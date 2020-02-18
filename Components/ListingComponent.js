import React, { Component } from 'react'
import {View,FlatList, Dimensions,Text,TouchableWithoutFeedback,Image,Alert,Button} from 'react-native'
import LoadingComponent from './LoadingComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

 class ListingComponent extends Component {
    static navigationOptions = ({ navigation })=>{
        return{
            title: 'JM\'s Famous Recipes',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#f7495a'
              },
            headerLeft: () => <Button 
            title="Drawer" backgroundColor= 'white' color='white'
            onPress={() => navigation.pop()}
        />
        } 
    }
    constructor(props) {
        super(props);
        this.state = {
            recipeList:[],isLoading: false
         };
       }
       componentDidMount() {
        this.onLoad()
    }
    render() {
        return (
            <View style={{ flex: 1,alignContent: 'center'}}>
                <LoadingComponent isLoading={this.state.isLoading}></LoadingComponent>   
                  <FlatList 
                  data = {this.props.payload}
                  extraData={this.props}
                  renderItem={({ item,index }) => {
                    return <View style={{margin: 10, height: 200, width: Dimensions.get('window').width - 20,borderColor: 'black',borderRadius: 10,borderWidth:1,flexDirection: 'row'}}>
                         <Image
                            style={{flex:0.4,resizeMode : 'cover',borderRadius: 10}}
                            source={{uri: item.photo == null ? '/Users/ketaki.damale/Documents/React Native/RecipeApp/assets/setting.jpg' : item.photo}}
                           />
                          <TouchableWithoutFeedback onPress={() => this.onPostClick(item)}>
                            <View style = {{flexDirection: 'column'}}>
                                 <Text style = {{margin: 10}}>Recipe: {item.name}</Text>
                                 <Text style = {{margin: 10}}>FullName: {item.firstName}{item.lastName}</Text>
                                 <Text style = {{margin: 10}}>Preparation Time: {item.preparationTime}</Text>
                                 <Text style = {{margin: 10}}>Serves: {item.serves}</Text>
                                 <View style = {{flexDirection: 'row'}}>
                                <Button title = '+' onPress={() => {
                                    this.props.onPlus(index,this.props.payload)
                                    setTimeout(()=> {
                                        this.forceUpdate()
                                    }, 200);}}></Button>
                                    <Text style = {{margin: 10}}>{item.counter}</Text>
                                     <Button title = '-' onPress={() => {
                                         this.props.onMinus(index,this.props.payload)
                                         setTimeout(()=> {
                                            this.forceUpdate()
                                         }, 200);
                                         }}></Button>
                                 </View>
                            </View>
                         </TouchableWithoutFeedback>
                    </View>
                }}
                style={{flex: 1 }}
                keyExtractor={(item) => item.recipeId}
                  >
                 </FlatList>
            </View>
        );
    }
    onLoad = () => {
        this.setState({isLoading: true})
        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            return response.json()
            this.setState({isLoading: false})
        }).then((responseJSON) => {
            this.setState({recipeList: responseJSON})
           Object.keys(responseJSON).map(
                function(object){
                    responseJSON[object]["counter"]='0'
              });
            this.props.onLoadBinding(this.state.recipeList)
            console
            this.setState({isLoading: false})
        }).catch((error) => {
            console.log(error);
            this.setState({isLoading: false})
        })
    }
    onPostClick = (item) => {
        Alert.alert('Cheif ' + item.firstName, 'This is ' + item.name + ' Recipe')
    }
}
const onPlus = (index,responseData) => {
    return {
        type: 'PLUS',
        index: index,
        json: responseData
    }
}
const onMinus = (index,responseData ) => {
    return {
        type: 'MINUS',
        index: index,
        json: responseData
    }
}
const onLoadBinding = (responseData) => {
    return {
        type: '',
        json: responseData
    }
}
const mapStateToProps = (state) => {
    return { payload: state.payload}
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onPlus,
        onMinus,
        onLoadBinding
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ListingComponent)