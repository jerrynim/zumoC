import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import { SafeAreaView, View, Text, Button } from "react-native";

interface IProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

class HomeScreen extends React.Component<IProps> {
  public render() {
    return (
      <SafeAreaView>
        <View>
          <Text>this is home</Text>
        </View>
        <Button
          title={"go to Discover"}
          onPress={() => this.props.navigation.navigate("Discover")}
        />
        <Button
          title={"go to Search"}
          onPress={() => this.props.navigation.navigate("Search")}
        />
      </SafeAreaView>
    );
  }
}

class DiscoverScreen extends React.Component<IProps> {
  public render() {
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
  public render() {
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
  Home: { screen: HomeScreen },
  Discover: { screen: DiscoverScreen },
  Search: { screen: SearchScreen }
});

const AppContainer = createAppContainer(HomeStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
