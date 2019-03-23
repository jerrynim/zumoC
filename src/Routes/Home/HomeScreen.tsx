import React, { createRef } from "react";
import { SafeAreaView, NavigationScreenProp } from "react-navigation";
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import styled from "styled-components/native";
import { WEATHERAPI_KEY, AIRVISUAL_KEY } from "../../keys";
import { reverseGeoCode } from "../../utils";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import Page from "../Page";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Header = styled.View`
  background-color: red;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  position: absolute;
`;

const SubTitle = styled.Text`
  color: white;
  font-size: 14;
  font-weight: 700;
  margin-bottom: 20px;
`;
const Title = styled.Text`
  color: white;
  font-size: 25;
  font-weight: 600;
  text-align: center;
  margin-bottom: 40px;
`;
const HasgTags = styled.Text`
  color: white;
  font-size: 14;
  font-weight: 700;
`;

const HeaderTitles = styled.View`
  background-color: black;
  padding-top: 30px;
  position: absolute;
`;
const Weather = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
  text-align: center;
  background-color: " rgba(0,0,0,0.07)";
`;

const images = [
  { id: 1, src: require("../../images/valley.jpeg") },
  { id: 2, src: require("../../images/lake.jpeg") },
  { id: 3, src: require("../../images/forest.jpeg") },
  { id: 4, src: require("../../images/flower.jpeg") }
];

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
  airPollution: number;
  activeImage: any;
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
    activeImage: null,
    Week: "",
    Date: "",
    temperature: 0,
    weather: "",
    GeoName: "",
    airPollution: 0,
    WeekSchedule: [{ id: 0, day: "", dayName: "", temp: 0, weather: "" }]
  };

  public allImages = { images };
  public oldPosition = { x: 0, y: 0, width: 0, height: 0 };
  public position = new Animated.ValueXY();
  public dimensions = new Animated.ValueXY();
  public animation = new Animated.Value(0);
  public activeImageStyle = null;
  public viewImage = createRef();

  openImage = (index) => {
    this.allImages[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX;
      this.oldPosition.y = pageY;
      this.oldPosition.width = width;
      this.oldPosition.height = height;

      this.position.setValue({
        x: pageX,
        y: pageY
      });

      this.dimensions.setValue({
        x: width,
        y: height
      });

      this.setState(
        {
          activeImage: images[index]
        },
        () => {
          this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
            console.log(dx, dy, dWidth, dHeight, dPageX, dPageY);
            Animated.parallel([
              Animated.timing(this.position.x, {
                toValue: dPageX,
                duration: 300
              }),
              Animated.timing(this.position.y, {
                toValue: dPageY,
                duration: 300
              }),
              Animated.timing(this.dimensions.x, {
                toValue: dWidth,
                duration: 300
              }),
              Animated.timing(this.dimensions.y, {
                toValue: dHeight,
                duration: 300
              }),
              Animated.timing(this.animation, {
                toValue: 1,
                duration: 300
              })
            ]).start();
          });
        }
      );
    });
  };

  closeImage = () => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 300
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: 250
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 250
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 250
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 250
      })
    ]).start(() => {
      this.setState({
        activeImage: null
      });
    });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const GeoName = await reverseGeoCode(latitude, longitude);
        this.getWeather(latitude, longitude);
        this.getAirPolution(latitude, longitude);
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

  getAirPolution = async (lat, lng) => {
    await fetch(
      `http://api.airvisual.com/v2/nearest_city?lat={${lat}}&lon={${lng}}&key=${AIRVISUAL_KEY}`
    )
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          airPollution: json.data.current.pollution.aqius
        })
      );
  };

  airPoullutionView = () => {
    const { airPollution } = this.state;
    if (airPollution <= 50) {
      return (
        <Text style={{ textAlign: "center" }}>
          미세먼지 지수: {airPollution} 좋음
        </Text>
      );
    } else if (airPollution <= 100) {
      return (
        <Text style={{ textAlign: "center" }}>
          미세먼지 지수: {airPollution} 나쁨
        </Text>
      );
    } else {
      return (
        <Text style={{ textAlign: "center" }}>
          미세먼지 지수: {airPollution} 매우나쁨
        </Text>
      );
    }
  };

  render() {
    const activeImageStyle = {
      width: SCREEN_WIDTH,
      height: 300,
      left: 0,
      top: this.position.y
    };

    const animatedContentY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0]
    });

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1]
    });

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [
        {
          translateY: animatedContentY
        }
      ]
    };

    const animatedCrossOpacity = {
      opacity: this.animation
    };
    const { Date, Week, WeekSchedule } = this.state;
    return (
      <SafeAreaView>
        <Weather>
          <Text
            style={{
              color: "#c0392b",
              fontSize: 25,
              textAlign: "center"
            }}
          >
            {Date} - {Week}
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: "black",
              fontSize: 12,
              textAlign: "center",
              marginBottom: 10
            }}
          >
            {this.state.GeoName}
          </Text>
          <View
            style={{
              width: SCREEN_WIDTH,
              height: 70,
              paddingLeft: 20,
              paddingRight: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {WeekSchedule.map((schedule) => {
              if (schedule.weather === "Rain") {
                return (
                  <View style={{ alignItems: "center" }} key={schedule.id}>
                    <Text style={{ color: "#192a56" }}>{schedule.dayName}</Text>
                    <Icon name={"ios-rainy"} size={20} />
                    <Text>{schedule.temp}</Text>
                  </View>
                );
              } else if (schedule.weather === "Clear") {
                return (
                  <View style={{ alignItems: "center" }} key={schedule.id}>
                    <Text style={{ color: "#192a56" }}>{schedule.dayName}</Text>
                    <Icon name={"md-sunny"} size={20} />
                    <Text>{schedule.temp}</Text>
                  </View>
                );
              } else if (schedule.weather === "Clouds") {
                return (
                  <View style={{ alignItems: "center" }} key={schedule.id}>
                    <Text style={{ color: "#192a56" }}>{schedule.dayName}</Text>
                    <Icon name={"ios-cloud-outline"} size={20} />
                    <Text>{schedule.temp}</Text>
                  </View>
                );
              } else {
                return (
                  <View style={{ alignItems: "center" }} key={schedule.id}>
                    <Text style={{ color: "#192a56" }}>{schedule.dayName}</Text>
                    <Text>{schedule.temp}</Text>
                  </View>
                );
              }
            })}
          </View>
          <View style={{ height: 30 }}>
            <this.airPoullutionView />
          </View>
        </Weather>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: xOffset } } }],
            { useNativeDriver: true }
          )}
          horizontal
          pagingEnabled
          style={{}}
        >
          {images.map((image, index) => (
            <TouchableWithoutFeedback
              onPress={() => this.openImage(index)}
              key={image.id}
            >
              <Animated.View
                style={{
                  height: 550,
                  width: SCREEN_WIDTH,
                  padding: 15,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-end"
                }}
              >
                <Image
                  ref={(image) => (this.allImages[index] = image)}
                  source={image.src}
                  style={{
                    height: 500,
                    resizeMode: "cover",
                    borderRadius: 20
                  }}
                />
                <Header>
                  <TouchableOpacity>
                    <Image
                      source={require("../../images/back.png")}
                      style={{ width: 23, height: 23 }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{ justifyContent: "center", flexDirection: "row" }}
                  >
                    <Image
                      source={require("../../images/share.png")}
                      style={{ width: 23, height: 23, marginRight: 10 }}
                    />
                    <Image
                      source={require("../../images/heart.png")}
                      style={{ width: 23, height: 23, marginRight: 10 }}
                    />
                  </View>
                </Header>
                <HeaderTitles>
                  <SubTitle>루프탑에서 봄디브 한 잔해~</SubTitle>
                  <View style={{ width: 220 }}>
                    <Title>로맨틱 파노라마 갬성 루프탑 추천 6</Title>
                  </View>
                  <HasgTags>#봄바람스멜 #옥땅으로 따라와</HasgTags>
                </HeaderTitles>
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </Animated.ScrollView>
        <ScrollView
          style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? "auto" : "none"}
        >
          <View
            style={{ flex: 1, zIndex: 1001 }}
            ref={(view) => (this.viewImage = view)}
          >
            <Animated.Image
              source={
                this.state.activeImage ? this.state.activeImage.src : null
              }
              style={[
                {
                  resizeMode: "cover",
                  top: 0,
                  left: 0,
                  height: null,
                  width: null
                },
                activeImageStyle
              ]}
            />
            <TouchableWithoutFeedback onPress={() => this.closeImage()}>
              <Animated.View
                style={[
                  { position: "absolute", top: 30, right: 30 },
                  animatedCrossOpacity
                ]}
              >
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", color: "white" }}
                >
                  X
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View
            style={[
              {
                flex: 1,
                zIndex: 1000
              },
              animatedContentStyle
            ]}
          >
            <Page />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const xOffset = new Animated.Value(0);

export default HomeScreen;
