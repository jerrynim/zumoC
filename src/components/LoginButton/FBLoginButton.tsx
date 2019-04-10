import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Facebook } from "expo";
export default class FBLoginButton extends React.Component {
  async logIn() {
    try {
      const {
        type,
        token
        // expires,
        // permissions,
        // declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("736201003429834", {
        permissions: ["public_profile"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        console.log(await response.json());
      } else {
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.logIn}>
          <Image
            source={require("../../images/facebook.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
