module.exports = {
  followOrUnfollow: async (req, res) => {
    const { id } = req.session.user;
    const { gamertag } = req.params;
    const db = req.app.get("db");

    const result = await db.check_follow([id, gamertag]);
    const existingFollow = result[0];

    if (existingFollow) {
      db.unfollow([id, gamertag]);
      res.sendStatus(200);
    } else {
      db.follow([id, gamertag]);
      res.sendStatus(200);
    }
  },

  getFollows: async (req, res) => {
    const { id } = req.session.user;
    const db = req.app.get("db");

    const result = await db.get_following_list([id]);
    res.status(200).send(result);
  }
};
