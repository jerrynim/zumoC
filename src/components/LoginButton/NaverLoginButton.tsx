import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import axios from "axios";
class NaverLoginButton extends React.Component {
  login = () => {
    const naver_id_login = new window.naver_id_login(
      "kZjrhXssUwwA4yjQLNcu",
      redirectURI
    );
  };

  public render() {
    return (
      <View>
        <TouchableOpacity onPress={this.logIn}>
          <Image
            source={require("../../images/naver.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default NaverLoginButton;
