'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

var SearchResults = require('./SearchResults')

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <TextInput
        onChangeText={(text)=> this.setState({
          searchQuery: text})}
        style={styles.input}
        placeholder="Search Query"></TextInput>

        <TouchableHighlight
        onPress={this.onSearchPressed.bind(this)}
          style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>
      </View>
    );
  }
  onSearchPressed(){
    this.props.navigator.push({
      component: SearchResults,
      title: 'Results',
      passProps: {
        searchQuery: this.state.searchQuery
      }
    });
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 100,
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width: 65,
        height: 55
    },
    heading: {
      fontSize: 30,
      margin: 10,
      marginBottom: 20
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec',
        borderRadius: 0,
        color: '#48BBEC',
    },
    button: {
      height: 50,
      backgroundColor: '#48BBEC',
      borderColor: '#48BBEC',
      alignSelf: 'stretch',
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5
    },
    buttonText: {
      fontSize: 24,
      color: '#FFF',
    },
});

module.exports = Search;
