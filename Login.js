'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import buffer from 'buffer';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      showProgess: false
    }
  }
  render(){
    var errorCtrl = <View />;

    if(!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        That username and password combination did not work
      </Text>
    }

    if(!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>
        We experienced and unexpected issue
      </Text>
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo}
        source={require('image!Octocat')} />
        <Text style={styles.heading}>
          Github browser
        </Text>
        <TextInput
        onChangeText={(text)=> this.setState({username: text})}
        style={styles.loginInput}
        placeholder="github username" />
        <TextInput
          onChangeText={(text)=> this.setState({password: text})}
          style={styles.loginInput}
          placeholder="github password"
          secureTextEntry={true} />

        <TouchableHighlight
        onPress={this.onLoginPressed.bind(this)}
          style={styles.button}>
            <Text style={styles.buttonText}>
              Log in
            </Text>
          </TouchableHighlight>

          {errorCtrl}

          <ActivityIndicator
            animating={this.state.showProgess}
            size="large"
            style={styles.loader} />
      </View>
    );
  }
  onLoginPressed(){
    //console.log('Attempting to log in with username ' + this.state.username);
    this.setState({showProgess: true});
    var authService = require('./AuthService');
    authService.login({
        username: this.state.username,
        password: this.state.password
    }, (results)=> {
        this.setState(Object.assign({
            showProgress: false
        }, results));

        if(results.success && this.props.onLogin){
            this.props.onLogin();
        }
    });
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
      paddingTop: 40,
      padding: 10,
      alignItems: 'center',
      flex: 1
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
    loginInput: {
      height: 50,
      marginTop: 10,
      padding: 4,
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#48BBEC',
      borderRadius: 0,
      color: '#48BBEC'
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
      fontSize: 22,
      color: '#FFF',
      alignSelf: 'center'
    },
    loader: {
      marginTop: 20
    },
    error: {
      color: 'red',
      paddingTop: 10
    }
});

module.exports = Login;
