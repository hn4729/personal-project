const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { username, password, gamertag, profile_img } = req.body;
    const db = req.app.get("db");

    const result = await db.get_user([username]);
    const existingUser = result[0];

    const result_2 = await db.get_gamertag([gamertag]);
    const existingGamertag = result_2[0];

    if (existingUser) {
      res.status(409).send("Username taken.");
    } else if (existingGamertag) {
      res.status(409).send("Display name taken.");
    } else {
      const hash = await bcrypt.hash(password, 10);
      const registeredUser = await db.register_user([
        username,
        hash,
        gamertag,
        profile_img
      ]);
      const user = registeredUser[0];
      req.session.user = {
        id: user.user_id,
        username: user.username,
        gamertag: user.gamertag,
        profile_img: user.profile_img
      };
      res.status(201).send(req.session.user);
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");

    const foundUser = await db.get_user([username]);
    const user = foundUser[0];

    if (!user) {
      res
        .status(401)
        .send(
          "User not found. Please register as a new user before logging in"
        );
    }

    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (!isAuthenticated) {
      res.status(403).send("Incorrect Password");
    }

    req.session.user = {
      id: user.user_id,
      username: user.username,
      gamertag: user.gamertag,
      profile_img: user.profile_img
    };

    res.status(200).send(req.session.user);
  },

  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
};
