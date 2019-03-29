import React from "react";
import {
  SafeAreaView,
  NavigationScreenProp,
  DrawerActions
} from "react-navigation";
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { WEATHERAPI_KEY, AIRVISUAL_KEY } from "../../keys";
import { reverseGeoCode } from "../../utils";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import Page from "../Page";
import { Ionicons } from "@expo/vector-icons";
import {
  HeaderMiddle,
  Weather,
  HeaderTitles,
  SubTitle,
  Title,
  HasgTags,
  PageHeader,
  PageHeaderTitles,
  PageTitle,
  Header
} from "../styled";
import Discover from "../Discover";

const SCREEN_WIDTH = Dimensions.get("window").width;
const NAVBAR_HEIGHT = 100;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const AnimatedListView = Animated.createAnimatedComponent(ScrollView);

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
  scrollAnim: Animated.Value;
  offsetAnim: Animated.Value;
  clampedScroll: Animated.AnimatedDiffClamp;
  active: number;
  xTabOne: number;
  xTabTwo: number;
  translateX: Animated.Value;
  translateXTabOne: Animated.Value;
  translateXTabTwo: Animated.Value;
  translateY: number;
}

interface Schedule {
  id: number;
  day: string;
  dayName: string;
  temp: number;
  weather: string;
}

class HomeScreen extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    /*ListView 의 현재 스크롤 y 위치입니다.*/
    const offsetAnim = new Animated.Value(0);
    /*필요한 경우 프로그래밍 방식으로 탐색 바를 이동하는 데 사용됩니다. 이것은 스크롤 동작의 끝에서 네비게이션 바를 완전히 드러내거나 숨길 때 유용합니다. */
    this.state = {
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: "clamp"
          }),
          offsetAnim
        ),
        0,
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT
      ),
      /*이 값은 navbar에 애니메이션을 적용하는 데 사용됩니다. 우리는 또한 각 렌더에서 다시 생성되는 것을 피하기 위해 그것을 상태로 저장합니다. scrollAnim 과 offsetAnim을 함께 추가 한 다음 Animated.diffClamp 를 사용하여 만듭니다. diffClamp 가 다음 섹션에서 자세히 설명 합니다. 또한 iOS에서 반송 효과 문제를 피하기 위해 scrollAnim 에 보간을 수행 합니다. */
      activeImage: null,
      Week: "",
      Date: "",
      temperature: 0,
      weather: "",
      GeoName: "",
      airPollution: 0,
      WeekSchedule: [{ id: 0, day: "", dayName: "", temp: 0, weather: "" }],
      active: 0,
      xTabOne: 0,
      xTabTwo: 0,
      translateX: new Animated.Value(0),
      translateXTabOne: new Animated.Value(0),
      translateXTabTwo: new Animated.Value(SCREEN_WIDTH),
      translateY: -1000
    };
  }

  public allImages = {};
  public oldPosition = { x: 0, y: 0, width: 0, height: 0 };
  public position = new Animated.ValueXY();
  public dimensions = new Animated.ValueXY();
  public animation = new Animated.Value(0);
  public activeImageStyle = null;
  public viewImage: null | View = null;

  public _clampedScrollValue = 0;
  public _offsetValue = 0;
  public _scrollValue = 0;
  public _scrollEndTimer = 0;
  openImage = (index) => {
    const image: Image = this.allImages[index];
    image.measure((_, __, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX;
      this.oldPosition.y = pageY;
      this.oldPosition.width = width;
      this.oldPosition.height = height;
      /*console.log(x,y,width,height,pageX,pageY);
      46 30 283 450 46 301.3333435058594
      */
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
          Animated.parallel([
            Animated.timing(this.position.x, {
              toValue: 0,
              duration: 1000
            }),
            Animated.timing(this.position.y, {
              toValue: 0,
              duration: 1000
            }),
            Animated.timing(this.dimensions.x, {
              toValue: SCREEN_WIDTH,
              duration: 1000
            }),
            Animated.timing(this.dimensions.y, {
              toValue: 300,
              duration: 1000
            }),
            Animated.timing(this.animation, {
              toValue: 1,
              duration: 1000
            })
          ]).start();
        }
      );
    });
  };

  closeImage = () => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 1000
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: 1000
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 1000
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 1000
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 1000
      })
    ]).start(() => {
      this.setState({
        activeImage: null
      });
    });
  };

  handleSlide = (value) => {
    let { active, translateX, translateXTabOne, translateXTabTwo } = this.state;
    Animated.spring(translateX, {
      bounciness: 0,
      toValue: value,
      speed: 10
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          bounciness: 0,
          toValue: 0,
          speed: 10
        }),
        Animated.spring(translateXTabTwo, {
          bounciness: 0,
          toValue: SCREEN_WIDTH,
          speed: 10
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          bounciness: 0,
          toValue: -SCREEN_WIDTH,
          speed: 10
        }),
        Animated.spring(translateXTabTwo, {
          bounciness: 0,
          toValue: 0,
          speed: 10
        })
      ]).start();
    }
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

    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value;
    });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue =
      this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
        ? this._offsetValue + NAVBAR_HEIGHT
        : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true
    }).start();
  };

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
    const {
      clampedScroll,

      active,
      translateXTabOne,
      translateXTabTwo,
      translateX,
      translateY,
      Date,
      Week,
      WeekSchedule
    } = this.state;

    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y
    };

    const animatedContentY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
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
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: "clamp"
    });

    return (
      <SafeAreaView>
        <Header>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(DrawerActions.toggleDrawer());
            }}
          >
            <Image
              source={require("../../images/next.png")}
              style={{
                marginLeft: 20,
                width: 20,
                height: 20
              }}
            />
          </TouchableOpacity>
          <HeaderMiddle>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
              onLayout={(event) =>
                this.setState({
                  xTabOne: event.nativeEvent.layout.x
                })
              }
              onPress={() =>
                this.setState({ active: 0 }, () => this.handleSlide(0))
              }
            >
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 7,
                  fontWeight: "700",
                  color: active === 0 ? "#e0281a" : "#9e9897",
                  marginRight: 30
                }}
              >
                THIS WEEKEND
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onLayout={(event) =>
                this.setState({
                  xTabTwo: event.nativeEvent.layout.x
                })
              }
              onPress={() =>
                this.setState({ active: 1 }, () => this.handleSlide(115))
              }
            >
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 7,
                  fontWeight: "700",
                  color: active === 1 ? "#e0281a" : "#9e9897"
                }}
              >
                DISCOVER
              </Text>
            </TouchableOpacity>
          </HeaderMiddle>
          <View style={{ marginRight: 15 }}>
            <Ionicons
              name={"ios-search"}
              size={30}
              color={"rgba(0,0,0,0.7)"}
              onPress={() => this.props.navigation.navigate("Search")}
            />
          </View>
        </Header>
        <Animated.View
          style={{
            width: 10,
            height: 10,
            left: "35%",
            backgroundColor: "#007aff",

            transform: [
              {
                translateX
              }
            ]
          }}
        />

        <View
          style={{
            height: 3,
            width: SCREEN_WIDTH,
            backgroundColor: "rgba(0,0,0,0.25)"
          }}
        />

        <Animated.View
          style={{
            transform: [
              {
                translateX: translateXTabOne
              }
            ]
          }}
          onLayout={(event) =>
            this.setState({
              translateY: event.nativeEvent.layout.height
            })
          }
        >
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
                      <Text style={{ color: "#192a56" }}>
                        {schedule.dayName}
                      </Text>
                      <Icon name={"ios-rainy"} size={20} />
                      <Text>{schedule.temp}</Text>
                    </View>
                  );
                } else if (schedule.weather === "Clear") {
                  return (
                    <View style={{ alignItems: "center" }} key={schedule.id}>
                      <Text style={{ color: "#192a56" }}>
                        {schedule.dayName}
                      </Text>
                      <Icon name={"md-sunny"} size={20} />
                      <Text>{schedule.temp}</Text>
                    </View>
                  );
                } else if (schedule.weather === "Clouds") {
                  return (
                    <View style={{ alignItems: "center" }} key={schedule.id}>
                      <Text style={{ color: "#192a56" }}>
                        {schedule.dayName}
                      </Text>
                      <Icon name={"ios-cloud-outline"} size={20} />
                      <Text>{schedule.temp}</Text>
                    </View>
                  );
                } else {
                  return (
                    <View style={{ alignItems: "center" }} key={schedule.id}>
                      <Text style={{ color: "#192a56" }}>
                        {schedule.dayName}
                      </Text>
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
          <ScrollView horizontal pagingEnabled overScrollMode="never">
            {images.map((image, index) => (
              <TouchableWithoutFeedback
                onPress={() => this.openImage(index)}
                key={image.id}
              >
                <Animated.View
                  style={{
                    width: SCREEN_WIDTH,
                    paddingTop: 30,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "flex-end"
                  }}
                >
                  <Image
                    ref={(CImage) => (this.allImages[index] = CImage)}
                    source={image.src}
                    style={{
                      height: 450,
                      resizeMode: "cover"
                    }}
                  />
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
          </ScrollView>
          {this.state.activeImage && (
            <AnimatedListView
              style={StyleSheet.absoluteFill}
              pointerEvents={this.state.activeImage ? "auto" : "none"}
              scrollEventThrottle={16}
              bounces={false}
              onMomentumScrollBegin={this._onMomentumScrollBegin}
              onMomentumScrollEnd={this._onMomentumScrollEnd}
              onScrollEndDrag={this._onScrollEndDrag}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: { y: this.state.scrollAnim }
                    }
                  }
                ],
                { useNativeDriver: true }
              )}
            >
              <View
                style={{ flex: 1, zIndex: 1001 }}
                ref={(view) => (this.viewImage = view)}
                /*나타날 뷰 */
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
                <TouchableWithoutFeedback>
                  <Animated.View
                    style={[
                      {
                        position: "absolute",
                        marginTop: 120,
                        width: SCREEN_WIDTH
                      },
                      animatedCrossOpacity
                    ]}
                  >
                    <PageHeaderTitles>
                      <SubTitle>루프탑에서 봄디브 한 잔해~</SubTitle>
                      <View style={{ width: 220 }}>
                        <PageTitle>
                          로맨틱 파노라마 갬성 루프탑 추천 6
                        </PageTitle>
                      </View>
                      <HasgTags>#봄바람스멜 #옥땅으로 따라와</HasgTags>
                    </PageHeaderTitles>
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
            </AnimatedListView>
          )}

          {this.state.activeImage && (
            <Animated.View
              style={[
                {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: NAVBAR_HEIGHT
                },
                {
                  transform: [{ translateY: navbarTranslate }]
                }
              ]}
            >
              <PageHeader>
                <TouchableOpacity onPress={() => this.closeImage()}>
                  <Image
                    source={require("../../images/back.png")}
                    style={{
                      width: 23,
                      height: 23,
                      margin: 15
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    margin: 15
                  }}
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
              </PageHeader>
            </Animated.View>
          )}
        </Animated.View>

        <Animated.View
          style={{
            transform: [
              {
                translateX: translateXTabTwo
              },
              {
                translateY: -translateY
              }
            ]
          }}
        >
          <Discover navigation={this.props.navigation} />
        </Animated.View>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
