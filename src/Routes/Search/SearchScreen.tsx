import React from "react";
import { NavigationScreenProp } from "react-navigation";
import { SafeAreaView, View, Button, Text } from "react-native";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
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
export default SearchScreen;
