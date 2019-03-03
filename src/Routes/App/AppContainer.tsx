import React from "react";
import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationScreenProps,
  createDrawerNavigator
} from "react-navigation";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity
} from "react-native";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

class HomeScreen extends React.Component {
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
          onPress={() => navigation.navigation.toggleDrawer()}
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

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>This is home</Text>
        </View>
      </SafeAreaView>
    );
  }
}

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
    screen: HomeScreen,
    navigationOptions: ({ navigation }: NavigationScreenProps) => ({
      title: "Home",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
          <Text>aaa</Text>
        </TouchableOpacity>
      )
    })
  },
  Discover: {
    screen: DiscoverScreen,
    navigationOptions: () => ({
      title: "Discover"
    })
  },
  Search: { screen: SearchScreen }
});

const Drawer: React.SFC<IProps> = () => (
  <View>
    <Text>hi</Text>
  </View>
);

const AppContainer = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: Drawer,
    drawerWidth: Dimensions.get("window").width - 120
  }
);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
