import React from "react";
import Home from "../Home";
import Post from "../Post";
import Search from "../Search";
import { Router, Scene } from "react-native-router-flux";
const AppPresenter: React.SFC = () => (
  <Router>
    <Scene key="root">
      <Scene key="home" component={Home} title="Home" initial={true} />
      <Scene key="post" component={Post} title="post" />
      <Scene key="post" component={Search} title="search" />
    </Scene>
  </Router>
);
export default AppPresenter;
