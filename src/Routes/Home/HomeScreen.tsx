import React from "react";
import { SafeAreaView, NavigationScreenProp } from "react-navigation";
import { View, Text, Animated, Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { WEATHERAPI_KEY } from "../../keys";
import { reverseGeoCode } from "../../utils";
import moment from "moment";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Weather = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
`;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  Week: string;
  Date: string;
  temperature: number;
  weather: string;
  GeoName: string;
  WeekSchedule: Schedule[];
}

interface Schedule {
  id: number;
  day: string;
  dayName: string;
  temp: number;
  weather: string;
}

class HomeScreen extends React.Component<IProps, IState> {
  public state = {
    Week: "",
    Date: "",
    temperature: 0,
    weather: "",
    GeoName: "",
    WeekSchedule: []
  };
  // componentDidMount() {
  //   this.props.navigation.setParams({ toggleMenu: this._toggleMenu });
  // }

  // _toggleMenu = () => {
  //   this.setState({ isMenuOpen: !this.state.isMenuOpen });
  // };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const GeoName = await reverseGeoCode(latitude, longitude);
        this.getWeather(latitude, longitude);
        this.setState({
          GeoName: GeoName
        });
      },
      (error) => console.log(error)
    );
    this.getDate();
    this.getSchedule();
  }

  getDate = async () => {
    const today = moment().format("L");
    const today_1 = today.replace("/2019", "");
    const today_2 = today_1.replace("/", "-");

    const sevenDay = moment()
      .add(7, "days")
      .calendar();
    const sevenDay_1 = sevenDay.replace("/2019", "");
    const sevenDay_2 = sevenDay_1.replace("/", "-");

    this.setState({
      Date: today_2,
      Week: sevenDay_2
    });
  };

  getSchedule = async () => {
    let WeekScheduleIN: Schedule[] = [];

    for (let i = 0; i < 7; i++) {
      WeekScheduleIN.push({
        id: i,
        day: moment()
          .add(i, "days")
          .format("L")
          .replace("/2019", ""),
        dayName: moment()
          .add(i, "days")
          .format("ddd"),
        temp: 0,
        weather: ""
      });
    }

    await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?id=1835847&cnt=7&APPID=${WEATHERAPI_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        for (let i = 0; i < WeekScheduleIN.length; i++) {
          WeekScheduleIN[i].temp = Math.floor(json.list[i].main.temp - 273.15);
          WeekScheduleIN[i].weather = json.list[i].weather[0].main;
        }
      });
    this.setState({
      WeekSchedule: WeekScheduleIN
    });
    console.log(this.state.WeekSchedule);
  };

  getWeather = async (lat: number, lng: number) => {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${WEATHERAPI_KEY}`
    )
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          weather: json.weather[0].main,
          temperature: json.main.temp - 273.15
        })
      );
  };

  render() {
    const { Date, Week } = this.state;
    return (
      <SafeAreaView
        forceInset={{
          bottom: "never"
        }}
      >
        <Weather>
          <Text
            style={{
              color: "black",
              height: 30,
              fontSize: 20,
              textAlign: "center"
            }}
          >
            {Date} - {Week}
          </Text>
          <View style={{ width: SCREEN_WIDTH, height: 150 }} />
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
