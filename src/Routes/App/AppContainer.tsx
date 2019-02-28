import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps<any> {
  navigation: any;
}

class HomeScreen extends React.Component<IProps> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate("Details", {
              itemId: 86,
              otherParam: "anything you want here"
            });
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component<IProps> {
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");
    const otherParam = navigation.getParam("otherParam", "some default value");

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push("Details", {
              itemId: Math.floor(Math.random() * 100)
            })
          }
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
/*Consider a stack navigator with screens A and B. After navigating to A, its componentDidMount is called. When pushing B, its componentDidMount is also called, but A remains mounted on the stack and its componentWillUnmount is therefore not called.

  When going back from B to A, componentWillUnmount of B is called, but componentDidMount of A is not because A remained mounted the whole time.*/

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);
export default AppContainer;
