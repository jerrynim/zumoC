import React from "react";
import {
  SafeAreaView,
  NavigationScreenProp,
  NavigationScreenProps
} from "react-navigation";
import {
  View,
  Button,
  Text,
  Animated,
  Dimensions,
  StyleSheet
} from "react-native";
import styled from "styled-components/native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const HeadStyle = styled.View`
  display: flex;
  flex-direction: row;
`;
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
  static navigationOptions = (navigation: NavigationScreenProps) => {
    return {
      headerTitle: (
        <HeadStyle>
          <View style={{ backgroundColor: "powderblue" }}>
            <Button
              title={"THISWEEK"}
              color="black"
              onPress={() => navigation.navigation.navigate("Home")}
            />
          </View>
          <View style={{ backgroundColor: "skyblue" }}>
            <Button
              title={"DISCOVER"}
              color="black"
              onPress={() => navigation.navigation.navigate("Discover")}
            />
          </View>
        </HeadStyle>
      ),
      headerLeft: (
        <Button
          title={"Menu"}
          onPress={() => console.log("let's change AppPresenter's isMenuOpen")}
        />
      ),
      headerRight: (
        <Button
          title={"➤"}
          onPress={() => navigation.navigation.navigate("Search")}
        />
      )
    };
  };

  // componentDidMount() {
  //   this.props.navigation.setParams({ toggleMenu: this._toggleMenu });
  // }

  // _toggleMenu = () => {
  //   this.setState({ isMenuOpen: !this.state.isMenuOpen });
  // };

  render() {
    return (
      <SafeAreaView
        forceInset={{
          bottom: "never"
        }}
      >
        <Weather>
          <Text style={{ color: "grey", height: 30 }}>02.25 - 03.03</Text>
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
