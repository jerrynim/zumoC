import { gql } from "apollo-boost";

export const APP_QUERY = gql`
  {
    isLoggedIn @client
  }
`;
