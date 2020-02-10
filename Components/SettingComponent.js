import React, { Component } from 'react'
import {View, Dimensions,StyleSheet,Image,Text} from 'react-native'

export default class SettingComponent extends Component {
    constructor() {
        super()
    }
    render() {
        return <View>
                  <Image
                     style = {styles.ImageStyle}
                     source = {require('/Users/ketaki.damale/Documents/React Native/RecipeApp/assets/setting.jpg')} > 
                </Image>
        </View>
    }
}
const styles = StyleSheet.create({
    ImageStyle : {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'stretch'
    }
})