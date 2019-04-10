import { gql } from "apollo-boost";

export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount($name: String!) {
    createAccount(name: $name)
  }
`;
