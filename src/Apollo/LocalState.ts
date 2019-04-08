import { AsyncStorage } from "react-native";

export const defaults = {
  isLoggedIn: AsyncStorage.getItem("token") !== null ? true : false
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      AsyncStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logUserOut: (_, __) => {
      AsyncStorage.removeItem("token");
      return null;
    }
  }
};
