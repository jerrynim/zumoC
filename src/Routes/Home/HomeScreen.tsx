import React from "react";
import { SafeAreaView, NavigationScreenProp } from "react-navigation";
import { View, Text, Animated, Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { WEATHERAPI_KEY } from "../../keys";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Weather = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
  margin-bottom: 50px;
`;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  isMenuOpen: boolean;
}

class HomeScreen extends React.Component<IProps, IState> {
  // componentDidMount() {
  //   this.props.navigation.setParams({ toggleMenu: this._toggleMenu });
  // }

  // _toggleMenu = () => {
  //   this.setState({ isMenuOpen: !this.state.isMenuOpen });
  // };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentWeather = this.getWeather(
          position.coords.latitude,
          position.coords.longitude
        );
        console.log(position.coords.latitude, position.coords.longitude);
        console.log(currentWeather);
      },
      (error) => console.log(error)
    );
    console.log(this.getDate());
  }

  getDate = () => {
    const now = Date.now();
    return now;
  };
  getWeather = (lat, lng) => {
    const weather = fetch(
      `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${WEATHERAPI_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json);
    return weather;
  };
  public Today = Date.now();
  render() {
    return (
      <SafeAreaView
        forceInset={{
          bottom: "never"
        }}
      >
        <Weather>
          <Text style={{ color: "black", height: 30, fontSize: 17 }}>
            02.25 - 03.03
          </Text>
        </Weather>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: xOffset } } }],
            { useNativeDriver: true }
          )}
          horizontal
          pagingEnabled
          style={styles.scrollView}
        >
          <Screen text="Screen 1" index={0} />
          <Screen text="Screen 2" index={1} />
          <Screen text="Screen 3" index={2} />
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    backgroundColor: "#00d4ff",
    height: 600
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 45
  },
  screen: {
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  text: {
    fontSize: 45,
    fontWeight: "bold"
  }
});

const xOffset = new Animated.Value(0);

const Screen = (props: any) => {
  return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
        <Text style={styles.text}>{props.text}</Text>
      </Animated.View>
    </View>
  );
};

const transitionAnimation = (index: number) => {
  return {
    transform: [
      { perspective: 800 },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [0.25, 1, 0.25]
        })
      },
      {
        rotateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["0deg", "0deg", "0deg"]
        })
      },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["0deg", "0deg", "0deg"]
        })
      }
    ]
  };
};

export default HomeScreen;
