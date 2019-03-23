// import React from "react";
// import {
//   createStackNavigator,
//   createAppContainer,
//   NavigationScreenProps,
//   createDrawerNavigator
// } from "react-navigation";
// import Drawer from "react-native-drawer";
// import HomeScreen from "../Home";
// import DiscoverScreen from "../Discover/DiscoverScreen";
// import SearchScreen from "../Search/SearchScreen";
// import Menu from "../../components/Menu";
// import { TouchableOpacity, View, Text } from "react-native";
// // tslint:disable-next-line
// import { Ionicons } from "@expo/vector-icons";
// import styled from "styled-components/native";

// interface IState {
//   isMenuOpen: boolean;
// }

// const HeadStyle = styled.View`
//   display: flex;
//   flex-direction: row;
//   height: 40;
// `;

// const HomeStack = createStackNavigator(
//   {
//     Home: { screen: HomeScreen },
//     Discover: { screen: DiscoverScreen }
//   },
//   {
//     initialRouteName: "Home",
//     defaultNavigationOptions: (navigation: NavigationScreenProps) => {
//       let hcolor = "red";
//       let dcolor = "grey";
//       if (navigation.navigation.state.routeName === "Home") {
//         hcolor = "#e0281a";
//         dcolor = "#9e9897";
//       } else {
//         hcolor = "#9e9897";
//         dcolor = "#e0281a";
//       }
//       return {
//         headerTitle: (
//           <HeadStyle>
//             <TouchableOpacity
//               onPress={() => navigation.navigation.navigate("Home")}
//             >
//               <Text
//                 style={{
//                   fontSize: 14,
//                   marginTop: 7,
//                   fontWeight: "700",
//                   color: `${hcolor}`,
//                   marginRight: 15
//                 }}
//               >
//                 THIS WEEKEND
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => navigation.navigation.navigate("Discover")}
//             >
//               <Text
//                 style={{
//                   fontSize: 14,
//                   marginTop: 7,
//                   fontWeight: "700",
//                   color: `${dcolor}`,
//                   marginLeft: 15
//                 }}
//               >
//                 DISCOVER
//               </Text>
//             </TouchableOpacity>
//           </HeadStyle>
//         ),
//         headerLeft: null,
//         headerRight: (
//           <View style={{ marginRight: 10, marginBottom: 10 }}>
//             <Ionicons
//               name={"ios-search"}
//               size={30}
//               color={"rgba(0,0,0,0.7)"}
//               onPress={() => navigation.navigation.navigate("Search")}
//             />
//           </View>
//         )
//       };
//     }
//   }
// );

// const MainStack = createDrawerNavigator({
//   Main: {
//     screen: HomeStack
//   },
//   Search: {
//     screen: SearchScreen,
//     headerLeft: "null"
//   }
// });

// const AppPresenter = createAppContainer(MainStack);

// class AppContainer extends React.Component<IState> {
//   public state = {
//     isMenuOpen: false
//   };
//   render() {
//     const { isMenuOpen } = this.state;
//     return (
//       <React.Fragment>
//         <Drawer
//           type="overlay"
//           open={isMenuOpen}
//           content={<Menu />}
//           openDrawerOffset={100}
//           acceptTap={true}
//           onClose={() => {
//             this.setState({ isMenuOpen: !isMenuOpen });
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               position: "absolute",
//               zIndex: 1,
//               marginTop: 40,
//               marginLeft: 15
//             }}
//             onPress={() =>
//               this.setState({
//                 isMenuOpen: !isMenuOpen
//               })
//             }
//           >
//             <Ionicons size={50} name={"ios-menu"} color={"black"} />
//           </TouchableOpacity>
//           {isMenuOpen ? (
//             <View
//               style={{
//                 backgroundColor: "black",
//                 opacity: 0.6,
//                 height: 1000,
//                 width: 1000,
//                 position: "absolute",
//                 zIndex: 1
//               }}
//             >
//               <Text>overlay</Text>
//             </View>
//           ) : null}

//           <AppPresenter />
//         </Drawer>
//       </React.Fragment>
//     );
//   }
// }

// // export default AppContainer;

// defaultNavigationOptions: (navigation: NavigationScreenProps) => {
//   let hcolor = "red";
//   let dcolor = "grey";
//   if (navigation.navigation.state.routeName === "Home") {
//     hcolor = "#e0281a";
//     dcolor = "#9e9897";
//   } else {
//     hcolor = "#9e9897";
//     dcolor = "#e0281a";
//   }
//   return {
//     headerTitle: (
//       <HeadStyle>
//         <TouchableOpacity
//           onPress={() => navigation.navigation.navigate("Home")}
//         >
//           <Text
//             style={{
//               fontSize: 14,
//               marginTop: 7,
//               fontWeight: "700",
//               color: `${hcolor}`,
//               marginRight: 15
//             }}
//           >
//             THIS WEEKEND
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigation.navigate("Discover")}
//         >
//           <Text
//             style={{
//               fontSize: 14,
//               marginTop: 7,
//               fontWeight: "700",
//               color: `${dcolor}`,
//               marginLeft: 15
//             }}
//           >
//             DISCOVER
//           </Text>
//         </TouchableOpacity>
//       </HeadStyle>
//     ),
//     headerLeft: (
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigation.dispatch(DrawerActions.toggleDrawer());
//         }}
//       >
//         <Image
//           source={require("../../images/next.png")}
//           style={{
//             marginLeft: 20,
//             width: 20,
//             height: 20,
//             marginBottom: 10
//           }}
//         />
//       </TouchableOpacity>
//     ),
//     headerRight: (
//       <View style={{ marginRight: 10, marginBottom: 10 }}>
//         <Ionicons
//           name={"ios-search"}
//           size={30}
//           color={"rgba(0,0,0,0.7)"}
//           onPress={() => navigation.navigation.navigate("Search")}
//         />
//       </View>
//     )
//   };
// }
