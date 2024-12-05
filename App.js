import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "0970d94c2309bbd8b2a6d499d5f496cc";

export default function App() {
  const [region, setRegion] = useState("Loading...");
  const [days, setDays] = useState(null);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false); // 권한이 거부되면 'ok' 상태를 false로 설정
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setRegion(location[0].region);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    const json = await response.json();
    setDays(json);
  };

  useEffect(() => {
    getWeather();
  }, []);

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1); // Kelvin을 섭씨로 변환
  };
  const tempInCelsius = kelvinToCelsius(days.main.temp);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{region}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {!days ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          <View style={styles.day}>
            <Text style={styles.temp}>{tempInCelsius}°C</Text>
            <Text style={styles.description}>{days.weather[0].main}</Text>
            <Text style={styles.tinyText}>{days.weather[0].description}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontWeight: "500",
    fontSize: 120,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
  tinyText: {
    fontSize: 20,
  },
});
