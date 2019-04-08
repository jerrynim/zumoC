import React from "react";
import { AsyncStorage, View, Text } from "react-native";
import { NavigationScreenProp } from "react-navigation";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

class AuthLoadingScreen extends React.Component<IProps> {
  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem("token");

    this.props.navigation.navigate(token ? "Main" : "Auth");
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  public render() {
    return (
      <View>
        <Text>siba</Text>
      </View>
    );
  }
}
export default AuthLoadingScreen;
