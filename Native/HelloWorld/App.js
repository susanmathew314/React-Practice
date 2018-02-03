import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Bananas/>
		<Text>HelloWorld!</Text>
      </View>
    );
  }
}
class Bananas extends React.Component {
	render(){
		let pic = {uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'};
		return(
			<Image source={pic} style={styles.picture} />
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picture: {
	  width: 193,
	  height: 110,
  },
});
