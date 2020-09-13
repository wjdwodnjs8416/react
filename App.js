import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Alert} from "react-native"; 
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from './Weather';

const API_KEY = "530e8a001f40c78eac77bdc829fdead5";

export default class App extends React.Component {
  state = {
     isLoading: true

    };
    getWeather = async(latitude, longitude) => {
const {data} = await axios.get(
  `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
    this.setState({isLoading: false, temp: data.main.temp})
    };
    getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      this.getWeather(latitude, longitude);
      
      
    } catch (error) {
      Alert.alert("can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp} = this.state;
 return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
}
}

