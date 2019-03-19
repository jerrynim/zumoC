import React from "react";
import { SafeAreaView, NavigationScreenProp } from "react-navigation";
import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  ImageBackground
} from "react-native";
import styled from "styled-components/native";
import { WEATHERAPI_KEY, AIRVISUAL_KEY } from "../../keys";
import { reverseGeoCode } from "../../utils";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Weather = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
  text-align: center;
  background-color: " rgba(0,0,0,0.07)";
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
  airPollution: number;
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
    airPollution: 0,
    WeekSchedule: [{ id: 0, day: "", dayName: "", temp: 0, weather: "" }]
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
    const { Date, Week, WeekSchedule } = this.state;
    return (
      <SafeAreaView
        forceInset={{
          bottom: "never"
        }}
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
              marginTop: 20,
              color: "black",
              fontSize: 12,
              textAlign: "center"
            }}
          >
            이 주 의 Z U M O 가 이 드
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
          style={styles.scrollView}
        >
          <Screen
            title="루프탑에서 봄디브 하 잔해~"
            MainTitle="로맨틱 파노라마 갬성 루프탑 추천 6"
            hashTags={["#봄바람스멜", "#옥상으로따다와"]}
            uri={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQko1mS-PFT5T3wc1y7MkdsxBJS9Na1ASrAKCFHADD4cNUogs6k"
            }
            index={0}
          />
          <Screen
            title="Screen 2"
            uri={
              "data:image/jpeg;base64,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"
            }
            index={1}
          />
          <Screen
            title="Screen 3"
            uri={
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhIVFRUVFxUVFRUVFRUYFRUVFRYWFxUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGislHSUtLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EAEUQAAEDAgQCBggCBggHAQAAAAEAAhEDIQQSMUEFURMiYXGBkQYUMlKhsdHwQsEHYpLS4fEVFiMzgqKy4jRDVHKTo7Nz/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAJxEAAgIBAwQCAgMBAAAAAAAAAAECERIDEyEEMUFRFGEioYGR8FL/2gAMAwEAAhEDEQA/AOoGECtNw9rCFO1o5p89q7nNs5FBIqtoHkpOjKlLyoajzzStsdJEhIAUYe1VngnmUrcOfuVWK9iyZaGICkB7FHSokaDxKlbm7FDrwWr8itpnkn9GVCap3ICiqVuRlKmwtIuhgGqdnA2WUcQfsJhrnt8k9pi3EarsQFGXys/pHHSfJIHnclVti3C65MJ7VB0wGp8/qgVgUYiyJgVKCqwqpcxQ4jUixmT2uVXP2qWk5S4jTNBmirVFY0CpVnqIrkuXYCQmmqFC5yiL1qomTkWekSAdqrZipGNJTxoMrLAYOaHdiG00ophQUQl55IA71YkINVqd/QURBpSikU/phzSZ0uR8C9EhJJQjkCuMQ7knguUbanYnip2K2iExcqc1gUTqp5hIcyVMLRZEBL0/Yql9yPNRvqR2owsM6L/rB5KN+IConFwq9XESrWkQ9VF99Uc1BUxI2VIJwWq00jN6jZMcSTogPceajzI6RPEnInaXcypQCqnSJ9N8pOJSkjE9NatZrGCkwuaXsmHRLswDWOuJaZFvot/D1DkbnAD8rc4GgdHWA7JlZHpfhHvwzxTBLhDhBj2TLj22lXOCVTWo06gvmY1xJ2MdaT2GVkoq2x5O6L7aieHDmo34Yt1CgyqqTHbRazhTYZ91SZSWtg8OG33UTpIuFtlqq6AsytUVrEPWdWCjTiaakiKo8pW0/wBYJuVSNaFuzBE9JoG6laQquYc0pqhZuNlqVFmpVUDqyrPqqJ9U8lcdMmWoXHVxzUTsQOSpdIUjiVa00ZvVZbOM7E314qmlV7cSdyRb9cKVU5Qlgg3GaAqDdNqVeRKiKbClRRTkx/TeKaa5SZUAKqRNsbmKMpUrKcqXoO1JySGotlQsShiu9DZJlSzHgVm0lKGJ7mKWizmk5DUSqGyYAVxnCiRKsNIGgVmlXkQVjLVl4No6cfJmnh50ACRuDIuQtWEW3U70itqJnupAgg6EEea5D0exFWgyvhwIfSqVHtcfZFIuEnL+MAk2161o1HcVazAvOq2Frvq1X53MIYaZuerTJymec3PaQk37MNaWDVFvhfGq3rfqpIeMuUHLlczo80tuSIsQTEy0BdfTo8wvP6WGdQxoxTiXgCXZYkudLHwIAHtT4ELt6XE2PaH0zma4SD/D8lcLa4FCa8mi1gCeaqyTjD3KN9dx5q9lvuXvJdjVc9o1KrVcQ3a6oF5SSrWlRD1rLHTpDVKr3RBV4ojNljpCE01CooKUU0UgyYrqh5phdKlFJOFIItIKbIAjKrTaXYpWUUnNIag2URSTXBanqyBhRyU7qK2mZWVC2PVhyQjeQ9lmagBSBieGKsiKIwEFimEc011XkFNsdIWkCpm01XFU81NSlTKy4tD5hI5wQWpjlKQ2xwq9icHyogOxSU2lDoE2SBverNOYTaQUkrKTNooe1yqYuodlM56p4px2RCPIpy4KtQnmq2JwhggdZ9YshokQ1gyjM4XAlzjOsG17iyWFSYN3XeXWNNmbsl5Lacf9rWn9tV1DqKOVnH+lRDaYZPsu6oAjMA4AugWH9yY/VJhO9Dq4bTrNdPRsBqA6lpP4QDqCfie20vpNhswquOjBSAaNgHET36/tLlOnc4NwtM9bEVWNqwdGmGtb5uJ8lKk1Hg5I29RHpZpOEZhB3HI7iU+nQJW1iaTeSMHS/ktd/iz0VocmY3hzkvqDuS3sqa9ZfIkabETn3YYjUJvRLWrunZUajVtHUb7mUtNLsQCmlASkFIAVVkUCTOlAThSB3RaHyJnSiqh1FRZUcMVtEvTlHSnmowU4BDSGmx/TFKmdGUJUh2wLSmEK66hYEb81XfSISjNMJQaIwEuVEJ9KnJum2SkI1g5qTOApjguSZVwRCjOL8mmEl4IzUSAhPNCyVtIBO0KmKwhL04Gya4clCWpJJjbaLPrXYmOxfYoA1K2mnjEnKTFdiCVNhm5kzoYVqixKUklwVFNvklFILNxbcnSfrkf5ujY0fO3NaoasbizC/EUmn2WNdWPa9pAZ5S7zHJcs3aK1V+Jh8YOalitJFOm6xsDGf5lSfo94ThqjPWTTBrU3loeS73GEHLMSMxgwsni3F2N6em0dI6oGU+rOVvUyy525BBsJ0vC2P0V1SaNYG0PZ55IPyCpXic2glur+Tr3i6fTdCHwmgpHoFgvUbkjUjngJDGvaqNdt1bdV5KF1OVpB0Zz5I2U0dGkNNykbTctL+yK+iFzAFGDeyuDCndObhAEbiDBlTIkNEK+MME8UgFO4PbMroimmm4bLWc1JkT3RbRnBrki08gSJbo9oRrQm1GyFHmKWSszTuU6jE1pjRXHU5SsohabnBltux1GtOytZlA0QnmoFi+XwbrhckVQSo3MTnOSDxVpmbRK2k2LhV62HjRWc3YmGShSaBxTK4o2UlOkpcpTg1NzEoIITgkAQos0oe1ZnHqwYwvAlxa5giBsXyTsAGu0lXnOjVZHH8PUrU8tMQYeBNrublBJ7i5S68mOtKotLucDgndJTa8gSa1GnYaNiqR36zK6P9GhihWJETWjX3WM+qqU/Rw4enme+WtdTqOi5ztlvVHLr/BSfo+4rRb09J72tzVc9MuOUODhli+hGUea1i04nD06xnzwdv0qMxUuVGVTaPTpiAlKWJQkc5IY0sShoTS4IzBPkXBLKWVD0g5o6Uc0qY7RPKFX9ZbzSethGLDJFmUiqnGBJ64EYMWcS2mqocWm+udieEhbkS7KFR9c7Eqe2w3Ik4CVISkzqChyC5NzhJnCAskDkBRdIk6VOgyROlVfpkdOEYsWSLOZLmVM4hNNcp4MWaLpcml6p9KUnSlPAW4i5mTXvABLiABckmwHaqvSHmosTT6RjmFxAcCJGoncIcGGaKnpFXYcgD3SZ9hxjxyn4rBqOyuAy1HzmJILsrcoBhzidTtE35KljWVKRqGrWGWnJzAVM2Un3R4eSgbiRLWdKXdJTNVvUq3YQTeXCDY27F5s8nJtndFRpGrxPDh1NzWNeSYyiTNnNnUriMZRcx7mmQQTO97G+q3qdd1UMeyoQ1+eS5j5GQgaZ+1czXe4ve4ug5jsROgFr7lbdPkrMteMZeD2/BY8OpMcHZ5Y0l0AZiQJJAgC+0JzsUvO/0e8PqmocQS3owHM16znENOgtlAOp3XeELujFUckpOyU4gphqJsJFaSIbYpeUmcohCfBPIklInQiEANRCdCIRYUNhEJYRCLChISQnIRYUNhKlSosKH5kShCxNQSJUJ2FCISoRYUIhKhOxUIhCEWFAhCEWFAlCRKEWFHH8cw7qortGUZpaC42npBuNNOShbw5wdThzP7Ojkdckk9GR1Y1Eqw+q0Zy7KROlpgmRHgQn5qbTOVp7tZ0O3avIlJ2eokqKrMLkDGlzTJqm1xBe0ibfcbrjqtE5naWcbbiHArtqozuaacCzrgxN22sB9hcZiKJFSo13tB7rzOh5ro6fmzHW4O7/AEdWwz2+7UP/AM6a6dcl+jj+6rC9nt3Pu6/A+S61d0XwcUlyIhCFVk0CEqEWFCISpEWFAkSoRYUIhKiEWFCISoRYUIhLCRFhQ9CJRKys1oEIlEosKBCSUsosKBCR7w0S4gAblR0MUx/sPa7uP3zRYUSoQke8ASTATsKFRCzMbx/D0wT0gJAkASZ1tIHYuL436Y1KhIpgtaQAG695J8lD1EhqDZ6PlVHjNVzKZIiNHSYtB08lwtDj3EHs6rXltxmZTcTrJuBE7fKFu8LxmJrsd07HtIIytLcpI1nS/LwWWprJxaRrp6byQwY18kBg3EF+7LuPs8kPxBiSxs2kZ7AlskexoNVcbScNWOOkTzjeAVTGJrvBAoOp/wBpkBl12TBeeqBoPkuOjpsXDVnuMhtMREdc/wDM0EZbxHkuS427+2fYG43meqJNwJ5rumUnzeYA/W+xquT9JsDVFR9TI4t6vWgxOUCNOxa6D/IjVX4jPQ7G1KeKY1jSRUPRvEiI1LtdWwT5jdenkLx3A4t9Koyq0EOY6bjXY6jcEjxXVv8ATZ3UJp7vmIiACQB4ELtyrucrjZ2yRU+HcTp1WNcHCXCeXYriqyKBCEIsKBCRKnYUCr1sdTbUZSLhnfOVupIAJJ7BbdPxWIbTaXvIAHP5LEr4yg1zq4Jc4FgiRHXAiJ7OSWSQ1G0dAhcRW9OHljslMB0mDqAPHdVqPpvWazIWh7oAa82NhEkDU7+Kz34lbUj0BJK5HA+mgcB0jcrovyN9R4Qt+hxek4xmAMA3IAuYjzVLUT7EuDRflCq1OJUWkg1WAixE6FCea9hiy3KSVTHFKJBd0jYH3pqhvE6B0qs/aH5qS6LkolUavFqDdarfA5v9MqUY+lJHSstr1h9U6YE9Ss1olzg0c3EAfFZn9ZsMHlheQQctx1dr5tIuqvpAaGIpFort6pBgQZPkT5c1yuD4cHMMsLiS4STldBIDSCRyHzWc5OJUY2WONccdVeetLA45dQ2NA4A30/NM4Vxh1J+YEAEQZAMDYTry0/JOHAeYdAv7QjxOS95TDwJs3c7uzN0/ZXNuOzowVFwelFapfLZrxGWwteDedte5Z/FfSKtVZkPVGpHM331G6ir8MpsqNaawbJFjUYHQTqG5RI18itQ+jA3e7zG8R+HvRLU47iUEQn0Mf/1I006N5/NNp+hRBn1hs/8A5v8AhdbXH+N1KQZlY2XZvxHQADdp96fALMZ6X1R/yKZ1iXu3M8ttPBJZtWgagmbfBsAaFMU+lLruNg5olxEWjYK4WGf7w/5vouZp+mbp/wCHZM++791O/rmZ/wCHb+2f3UtuforOPs6TopE5z/m+iD/3Hnv9Fz49NDocMP8AyH91N/rmP+m/9n8EbcvQZxN5+oh5AtIhxO83i23kVV4pg+lYWdIWyWkdVxjKTPmCB4LNw3phSc6DRy2N+kZYjYzHatilxUPAIpWI95v1U/lFj4kjk+McGNBjXdMXSYjK4bE7krKc4+8PJdlx3DHFMa3Lkyua4Q5pmNjy+Pgsf+rZFy4xaNNP1vd8J1XVp66x/J8nPPSd8I5ukKrTOcDlDuWi2+F8brUyJqGzjvIg9g17lknEMJNna2s3966bNMiCXidDkYY/zrWo9yLfY9XwGPa9rZc3M7SNxEzG26svrtaQ0uAJmATcwJPwC8wwleowhzHOOUQ0ljTAn8P9pb+KdxDE1azgXOqHKCJIZv8A41L1B7Z6cKjToRrGu4tHenSvJ6dWo0yalRpFx1QR32fY6LW4h6UVXNDA6BAzHKZNhv8ANNan0LAX0rxlR1ZzHOIaD1WnYQOyNz2rA6cuDm2AOUEWAtEEDSbaoxGLc5xcSSdyQb98hR1WidII74Kwk/ZslxwLT5eKhDgCN9ZTxU7EjQCB3gW8lmkNjXmBr5p2Hqu3+es8lVxZMxGmn1Pz8UrXwO3aez+a0wtEp8lsnmPkkUDMxEyhRiWaTu8b+94b7JA8jRw0HPxWlX4bXAk1TF/YJEyRpI+CeMFWlpc525gEQ4nTbQA6d2q7d7S9nNt6pmurk/ibrzOnK6ipVTNqje6ZWtVwFYg2eTEEZwNbR2eHaoHYSsHOs7UESTGgFxO3WuOfYVO/p+P9+ww1PIvES4dQyDAJBgQtHghii0gyJdcx7x8Fkim8GRT9qC4DIcribmd9fgpKFZ180N7LaaediufWkpcr/fs108l3Nt5vY35TySGrOo2k2j4brF9dqh8RDfegmbCO7fySP4hWAJy+9FiPZzRNt4HmsMX6Nci1VwYfis8WbSaByzEv23sfiuxqFsi9vBcTTxlQFstiXSTlNsh6tzsQpKfpPVg5qbbE2yu0AJnXs+KUlOXgcZJFv0zfekJ9+PNq5rUyFtcSxjqxa45RkBEC+pknXuWVVpZXdYwCJB5ycsR3rbTmlGjKfLshLrpweeakxGELWhwcDLmtjvIvM+PglrU2gWc11wLCDJ1FzsZ8lpmqsimNz9qZnPMJlJ7XCTDQBMGJ7vzlWKWFHRmoagER1T7bpsCAPaA3hPIdFDCsp5nNcWgucZnlOscl3XDS3o2FjrZQBoW2EWjay43FUmEsJaG5gRLRrJbEw49nmZWpw7EdCwMAa4DcnW/YsNeSpFacknydZTdJAgWU9U6WGkbfT81zbPSB0+wwx37qcekr7Dom+Djf4LlzNdyPs454AkeaiqtDrROq0DRa5zgDuTEaTt4KN/DgfxERBsOZgb+C9H5On9/0zjplfhtcUxlGxNvFbmHxIdbT71WZR4eAZzzPMKyKcdngspa+m/P6ZopUPrkz9/MhUKj7m/mtNtfTS28BVMTREl8hoAk9WdN7diUep00+4SdlDGVIaCearV8ccztzN/BauI4eHAhzrd3jOqgq8Epgguc7rQ4TInNBBHfI809/Sfv+icpLsQYWs2WybOt3GYQcU0iTrqPKR99qtM4Wy2V3smRebgz4pa3CAZkxIjSLWj4AKVq6V+Ss2ZVTETvmHYpKz4a2Rcy7XwHwCsHgZ2cNue1klThFQkQQeq0anYXNxuZWi1tLwycmQNn3iOxCtNwNX3GHtzH6pU9yH/SHm/RpOw+MH45vMZjEyIItrYeSHPxk3v8Asnnt4lbPSDmClDxzb5rufS6bOVdVqGR/SONGoJi0ZWxbsBTDxnFAmWHQ2yui5na/5XK2QAf5g/n3pcgn+X0Uvo9MpdXMyKXpDWbrSbtq12xnw5WVPFekFRzicgbeYExpFwdV0b6Y5Dvn5qLoQdgl8OPsr5cvRzLuKuOrG2B1OvbyVhvHYP8Actne5G0b/ktz1Zu4HwSOwTPd+ST6RewXVv0YruNF4gUh8zunt40NHU45kRN1rHAs5BNPD6Z/CPgk+jXspdW/RkO4pTLs2VwERtPjEdlpUg4rR0iptebQOwHmtB3DqWuUKM8NpH8LVPxPsfy/oqVOKUdc1XS/tfOe/ZI3i9Ee/wCJJ/Pmrn9GU9mx3KKrw9p2UvpqLXUp+CvxbjzDTDW5osLgTAvqsQ8R3LXRoDYjtW1U4WzQpn9FU40SSUVQOdmSOItiI7uq34Jw4m33J8APktIcOYNvmpaGHDDmbIdsQSD5gpqn4DJox24x5uGkWmSYtMT23smHiDgbxb9Z31XTsGYZXOe4GAQXO8B7SmfgmO1DjeZMm/iVqtJMzerRx/8ASB1Ab4Od9U4cSdyGgFzMQZEToV1Z4bTJkye03+acOG0pmDPPe3ar2URvnKDi7+c/4v4JRxh0f7v9q6scPpzMSfAlHqVPYQl8aL9C+QzlBxd3b+0Pj1Uh4q4iD/q5+C6v1RgkZR5xKUYOn7g8yj4sPoXyX6OVqcZqOJLiXE6kvJJ+CjrcUc4QQTAAHWcfZAA15QPJdacHT9wffemuwdP3B5BUumihPqX6OQHEnCwEbC7rDz7vJK7ijzryjV31XVuwbeQ8gm+qDkEfHiL5DOWZj3xAFuUv+qBjqmw/1/VdT6seQ8ypBQPYnsRD5DOV9cq+6fJ/1Qur6E/q/H6IS2Ih8hmnkE6DTl2KVtMZhYb7DmUIXQYiVGATAGnLsURaI0+4QhAMhDRy5pjhfwQhIAOoS/fzQhMAZr5JlRxjVCEmNAxxnVK15vc+aRCTGgcUP3QhRIuJWefkkchC5ZG6I3JrUIREJE7ToFcAsfBIhdMTCQD7+Ce4WSoWhARbyTX/AH5oQmSxWbJlY2SITJEePvwTao1QhAyI7d6Ub/eyEIEPASHVCEAWGoQhIo//2Q=="
            }
            index={2}
          />
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    height: 480
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 45
  },
  screen: {
    height: 500,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
  }
});

const xOffset = new Animated.Value(0);

const Screen = (props: any) => {
  return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
        <ImageBackground
          source={{
            uri: props.uri
          }}
          imageStyle={{ resizeMode: "stretch" }}
          style={{ width: SCREEN_WIDTH - 90, height: 500 }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: 20,
              paddingTop: 170
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 13,
                  fontWeight: "700",
                  marginBottom: 25
                }}
              >
                {props.title}
              </Text>
            </View>
            <View style={{ width: 220 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  fontWeight: "200",
                  marginBottom: 25
                }}
              >
                {props.MainTitle}
              </Text>
            </View>
            <View>
              <Text style={{ color: "white", fontSize: 12, fontWeight: "800" }}>
                {props.hashTags}
              </Text>
            </View>
          </View>
        </ImageBackground>
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
          outputRange: [0.8, 1, 0.8]
        })
      }
    ]
  };
};

export default HomeScreen;
