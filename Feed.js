'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} from 'react-native';

import moment from 'moment';
import PushPayload from './PushPayload';

class Feed extends Component {
  constructor(props){
    super(props);

    var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
        dataSource: ds,
        showProgress: true,
        newUser: 'alastairparagas'
    };
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    require('./AuthService').getAuthInfo((err, authInfo) => {
      var url = 'https://api.github.com/users/'
          //+ authInfo.user.login
          + this.state.newUser
          + '/received_events';

      fetch(url, {
        headers: authInfo.header
      })
      .then((response) => response.json())
      .then((responseData) => {
        var feedItems =
            responseData.filter((ev) => ev.type == 'PushEvent');
            //responseData;
        this.setState({
          dataSource: this.state.dataSource
              .cloneWithRows(feedItems),
          showProgress: false
        });
      })
    });
  }

  pressRow(rowData) {
    this.props.navigator.push({
      title: 'Push Event',
      component: PushPayload,
      passProps: {
        pushEvent: rowData
      }
    });
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.pressRow(rowData)}
        underlayColor='#ddd'
      >
        <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1,
          backgroundColor: '#fff',
        }}>
          <Image
            source={{uri: rowData.actor.avatar_url}}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18
            }}
          />

          <View style={{
            paddingLeft: 20
          }}>
            <Text style={{backgroundColor: '#fff'}}>
                {moment(rowData.created_at).fromNow()}
            </Text>
            <Text style={{backgroundColor: '#fff'}}>
              <Text style={{ fontWeight: '600' }}>{rowData.actor.login}</Text>
            </Text>
            <Text style={{backgroundColor: '#fff'}}>
              {rowData.payload.ref.replace('refs/heads/', '')}
            </Text>
            <Text style={{backgroundColor: '#fff'}}>
              at <Text style={{ fontWeight: '600' }}>{rowData.repo.name}</Text>
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render(){
    if(this.state.showProgress) {
      return (
        <View style={{
          flex:1,
          justifyContent: 'center'
        }}>
          <ActivityIndicator
            size="large"
            animating={true} />
        </View>
      );
    }
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections= {true}
          />
      </View>
  );
  }
}

module.exports = Feed;
