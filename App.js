import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground,} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

import DateTime from './components/DateTime';
import WeatherScroll from './components/WeatherScroll';


const img = require('./assets/W1.jpg')
export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("28.4744", "77.5040");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e58188bdf6msh8032c1c926177e9p1db0a2jsn0e81b3ef509f',
      'X-RapidAPI-Host': 'forecast9.p.rapidapi.com'
    }
  };

  const fetchDataFromApi = (latitude, longitude) => {
      if(latitude && longitude) {
        fetch(`https://forecast9.p.rapidapi.com/rapidapi/forecast/${latitude}/${longitude}/summary/`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .then(response => setData(response))
        .catch(err => console.error(err));
      }
      
  }

  return (
    
    <View style={styles.container} >
      <ImageBackground source={img} style={styles.image}>
        <DateTime current={data.current} lat={data.lat} lon={data.lon} timezone={data.timezone}/>
        <WeatherScroll weatherData={data.daily}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});
