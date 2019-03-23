import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator,
  NavigationScreenProps,
  DrawerActions,
  DrawerItemsProps
} from "react-navigation";
import HomeScreen from "../Home";
import DiscoverScreen from "../Discover";
import SearchScreen from "../Search/SearchScreen";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import MyPageScreen from "../../Routes/MyPage";
import SettingScreen from "../../Routes/Setting";
import NoticeScreen from "../../Routes/Notice";
import Menu from "../../components/Menu";
import Page from "../Page";

const HeadStyle = styled.View`
  display: flex;
  flex-direction: row;
  height: 40;
`;
class DrawerComponent extends React.Component<DrawerItemsProps> {
  constructor(props: DrawerItemsProps) {
    super(props);
  }
  public render() {
    return (
      <SafeAreaView>
        <Menu
          onPress={(routeName: string) =>
            this.props.navigation.navigate({
              routeName: routeName
            })
          }
        />
      </SafeAreaView>
    );
  }
}
// onPress={() =>
//   this.props.navigation.navigate({
//     routeName: "MyPage"
//   })
// }
const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Discover: {
      screen: DiscoverScreen
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);
const MyDrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainNavigator
    },
    MyPage: {
      screen: MyPageScreen
    },
    Search: {
      screen: SearchScreen
    },
    Like: {
      screen: MyPageScreen
    },
    Setting: {
      screen: SettingScreen
    },
    Notice: {
      screen: NoticeScreen
    },
    Page: {
      screen: Page
    }
  },
  {
    contentComponent: DrawerComponent
  }
);
const AppPresenter = createAppContainer(MyDrawerNavigator);

class AppContainer extends React.Component {
  render() {
    return <AppPresenter />;
  }
}
export default AppContainer;
