import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  NavigationScreenProp,
  NavigationRoute,
  NavigationScreenProps
} from "react-navigation";
import { SafeAreaView, View, Text, Button } from "react-native";

interface IProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

class HomeScreen extends React.Component<IProps> {
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
      headerRight: (
        <Button
          title={"➤"}
          onPress={() => navigation.navigation.navigate("Search")}
        />
      )
    };
  };

  public render() {
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
