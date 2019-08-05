require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

//Auth Controller
const AC = require("./controllers/auth_controller");
const PC = require("./controllers/post_controller");

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

//Authorization Endpoints
app.post("/auth/register", AC.register);
app.post("/auth/login", AC.login);
app.get("/auth/logout", AC.logout);

//Posts
app.post("/posts", PC.create);
app.get("/posts", PC.getAllPosts);
app.get("/posts/profile", PC.getProfilePosts);
app.get("/posts/user/:gamertag", PC.getUserPosts);
app.get("/posts/game/:game", PC.getGamePosts);

app.listen(SERVER_PORT, () => console.log(`Listening on PORT ${SERVER_PORT}`));
