import React from "react";
import { ThemeProvider } from "../../typed-components";
import theme from "../../theme";
import AppPresenter from "./AppPresenter";
import { AppRegistry } from "react-native";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <AppPresenter />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
AppRegistry.registerComponent("App", () => App);
