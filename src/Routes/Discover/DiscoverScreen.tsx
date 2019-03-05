import React from "react";
import { View, SafeAreaView } from "react-native";

// const HeadStyle = StyleSheet.create({
//   View: {
//     backgroundColor: "#123822",
//     flex: 1,
//     justifyContent: "center"
//   },
//   Button: {
//     backgroundColor: "#198653"
//   }
// });

interface IProps {}

class DiscoverScreen extends React.Component<IProps> {
  // componentDidMount() {
  //   this.props.navigation.setParams({ toggleMenu: this._toggleMenu });
  // }

  // _toggleMenu = () => {
  //   this.setState({ isMenuOpen: !this.state.isMenuOpen });
  // };

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            height: 1000,
            width: 1000,
            backgroundColor: "blue",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0.2
          }}
        />
        <View
          style={{
            height: 50,
            width: 50,
            backgroundColor: "black"
          }}
        />
      </SafeAreaView>
    );
  }
}
export default DiscoverScreen;
