import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter as Router } from "react-router-dom";
import { RestLink } from "apollo-link-rest";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

const restLink = new RestLink({
  uri: "https://api.pandascore.co"
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "no-cors"
  }
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
