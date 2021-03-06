import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceAccount from "./serviceAccount.json";
// import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter as Router } from "react-router-dom";
import { RestLink } from "apollo-link-rest";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";

const restLink = new RestLink({
  uri: "https://hidden-cove-37487.herokuapp.com/https://api.pandascore.co"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = serviceAccount.pandascore_key;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
      // "Access-Control-Allow-Origin": "http://localhost:3000",
      // "Access-Control-Allow-Credentials": true,
      // "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      // "Access-Control-Allow-Headers": "Origin, Content-Type, Accept"
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(restLink),
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "no-cors",
    method: "GET"
  },
  credentials: "include"
});

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
