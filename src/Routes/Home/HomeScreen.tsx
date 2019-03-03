import React from "react";
import { NavigationScreenProp, NavigationScreenProps } from "react-navigation";
import { View, Button, Text } from "react-native";

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
        <View>
          <Button
            title={"THISWEEK"}
            onPress={() => navigation.navigation.navigate("Home")}
          />
          <Button
            title={"DISCOVER"}
            onPress={() => navigation.navigation.navigate("Discover")}
          />
        </View>
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
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: ""
        }}
      >
        <Text>Home Screen</Text>
      </View>
    );
  }
}
export default HomeScreen;
