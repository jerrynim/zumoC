import React from "react";
import { SafeAreaView } from "react-native";
import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator,
  DrawerItemsProps
} from "react-navigation";
import HomeScreen from "../Home";
import DiscoverScreen from "../Discover";
import SearchScreen from "../Search/SearchScreen";
import MyPageScreen from "../../Routes/MyPage";
import SettingScreen from "../../Routes/Setting";
import NoticeScreen from "../../Routes/Notice";
import Menu from "../../components/Menu";
import Page from "../Page";
import { ApolloProvider } from "react-apollo-hooks";
import Client from "../../Apollo/Client";

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
    initialRouteName: "Main",
    contentComponent: DrawerComponent
  }
);

const AppPresenter = createAppContainer(MyDrawerNavigator);

class AppContainer extends React.Component {
  render() {
    return (
      <ApolloProvider client={Client}>
        <AppPresenter />
      </ApolloProvider>
    );
  }
}
export default AppContainer;
