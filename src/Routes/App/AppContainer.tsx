import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Drawer from "react-native-drawer";
import HomeScreen from "../Home";
import DiscoverScreen from "../Discover/DiscoverScreen";
import SearchScreen from "../Search/SearchScreen";
import Menu from "../../components/Menu";

interface IState {
  isMenuOpen: boolean;
}

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Discover: { screen: DiscoverScreen },
  Search: { screen: SearchScreen }
});

const AppPresenter = createAppContainer(HomeStack);

class AppContainer extends React.Component<IState> {
  public state = {
    isMenuOpen: false
  };
  render() {
    const { isMenuOpen } = this.state;
    return (
      <Drawer
        type="overlay"
        open={isMenuOpen}
        content={<Menu />}
        openDrawerOffset={100}
      >
        <AppPresenter />
      </Drawer>
    );
  }
}

export default AppContainer;
