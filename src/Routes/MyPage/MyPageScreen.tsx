import React from "react";
import { Text, SafeAreaView } from "react-native";

interface IProps {
  navigation: any;
}

class MyPageScreen extends React.Component<IProps> {
  public render() {
    return (
      <SafeAreaView>
        <Text onPress={() => this.props.navigation.goBack()}>
          this is example
        </Text>
      </SafeAreaView>
    );
  }
}

export default MyPageScreen;
