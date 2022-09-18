import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, Image, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

const [keyword, setKeyword] = useState('');
const [recipes, setRecipes] = useState([]);

const getRecipes = () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
  .then(response => response.json())
  .then(responseJson => setRecipes(responseJson.meals))
  .catch(error => {
    Alert.alert('Error', error);
  });
}

const listSeparator = () => {
  return(
    <View
      style={{
        height: 1,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%"
      }}
    />
  );
};

  return (

    <View style={ styles.container }>
      <StatusBar hidden={ true } />

    <FlatList
      style={ styles.list }

        keyExtractor={ (item, index) => index.toString() }
        renderItem={ ({ item }) =>      
        
        <View>

          <Text 
            style={{ fontSize: 15, fontWeight: 'bold' }}>
              { item.strMeal }
          </Text>
          <Image
            style={{ width: 45, height: 30 }}
            source={{uri:(`${ item.strMealThumb + '/preview' }`)}}
            />
          </View>}

      data={ recipes }

      ItemSeparatorComponent={ listSeparator }
      
    />

      <View>
      <TextInput
        style={ styles.input }
        placeholder='keyword'
        onChangeText={ text => setKeyword(text) } />
      </View>

      <View style={ styles.button }>
        <Button title='FIND' onPress= { getRecipes } />
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200
  },
  input : {
    width: 100,
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 3,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
button : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
    margin: 5,
    marginBottom: 50,
    borderColor: 'black',
    borderWidth: 1,
    width: '20%'
  },
list : {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  },
text : {
  color: 'black',
  fontSize: 20,
  marginBottom: 4,
  }
});
