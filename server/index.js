require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const path = require("path"); // Usually moved to the start of file

//Auth Controller
const AC = require("./controllers/auth_controller");
const PC = require("./controllers/post_controller");
const GC = require("./controllers/game_controller");
const LC = require("./controllers/likes_controller");
const CC = require("./controllers/comment_controller");
const FC = require("./controllers/follower_controller");

//Middleware
const TM = require("./middleware/timeout_middleware");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(`${__dirname}/../build`));

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
app.get("/auth/user-data", AC.getUserData);

//Users
app.get("/poggers/users", TM.timer, AC.getUsers);
app.put("/poggers/user/profile_image", AC.editProfileImage);
//Games
app.get("/api/games", GC.getGames);
app.post("/api/games");

//Posts
app.get("/posts", TM.timer, PC.getAllPosts);
app.get("/posts/profile", PC.getProfilePosts);
app.get("/posts/user/:gamertag", TM.timer, PC.getUserPosts);
app.get("/posts/game/:game", PC.getGamePosts);
app.get("/post/:id", TM.timer, PC.getIndividualPost);
app.post("/posts", PC.create);
app.put("/posts/:id", PC.edit);
app.delete("/posts/:id", PC.delete);

//Likes
app.post("/like/post/:post_id", LC.addOrRemoveLike);
app.get("/likes/posts", TM.timer, LC.getLikes);

//Comments
app.get("/post/comments/:post_id", TM.timer, CC.getComments);
app.get("/comments/count", TM.timer, CC.getCommentCount);
app.post("/post/comment/:post_id", CC.create);
app.put("/post/comment/:id", CC.updateComment);
app.delete("/post/comment/:id", CC.deleteComment);

app.post("/user/:gamertag", FC.followOrUnfollow);
app.get("/users/following", TM.timer, FC.getFollows);

io.on("connection", socket => {
  console.log("User connected");
  socket.on("chat message", data => {
    const { message, gamertag } = data;
    console.log(`${gamertag}: ${message}`);
    io.emit("chat message", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

http.listen(SERVER_PORT, () => console.log(`Listening on PORT ${SERVER_PORT}`));
