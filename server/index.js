require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

//Firebase
const firebase = require("firebase-admin");
//const functions = require("firebase-functions");

const serviceAccount = require("../../serviceAccount.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://personal-project-devmtn.firebaseio.com",
  storageBucket: "personal-project-devmtn.appspot.com"
});

const bucket = firebase.storage().bucket();

const app = express();

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database connected");
  })
  .catch(err => console.log(err));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`Listening on PORT ${SERVER_PORT}`));
