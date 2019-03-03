import React from "react";
import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationScreenProps,
  createAppContainer
} from "react-navigation";
import { SafeAreaView, View, Text, Button } from "react-native";
import Drawer from "react-native-drawer";

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

const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: "blue"
  },
  main: { paddingLeft: 3 }
};

const ControlPanel = () => {
  return (
    <View>
      <Text>hi</Text>
    </View>
  );
};

class DiscoverScreen extends React.Component<IProps> {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>this is Discover</Text>
        </View>
        <Button
          title={"go to Home"}
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </SafeAreaView>
    );
  }
}

class SearchScreen extends React.Component<IProps> {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>this is Search</Text>
        </View>
        <Button
          title={"go to Home"}
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </SafeAreaView>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Discover: {
    screen: DiscoverScreen
  },
  Search: { screen: SearchScreen }
});

const AppPresenter = createAppContainer(HomeStack);

class AppContainer extends React.Component<IState> {
  public state = {
    isMenuOpen: false
  };
  render() {
    const { isMenuOpen } = this.state;
    return (
      <Drawer
        type="overlay"
        open={isMenuOpen}
        content={<ControlPanel />}
        styles={drawerStyles}
        openDrawerOffset={100}
      >
        <AppPresenter />
      </Drawer>
    );
  }
}

export default AppContainer;
