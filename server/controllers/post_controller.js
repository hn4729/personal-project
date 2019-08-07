module.exports = {
  create: async (req, res) => {
    const { game, image_url, video_url, content_text } = req.body;
    const { id } = req.session.user;
    const db = req.app.get("db");

    // console.log(req.body);
    // console.log(req.session.user);

    const result = await db.get_game([game]);
    let existingGame = result[0];

    if (!existingGame) {
      const result_2 = await db.insert_new_game([game]);
      existingGame = result_2[0];
    }

    // console.log(existingGame);

    const newPost = await db.create_post([
      id,
      existingGame.game_id,
      content_text,
      image_url,
      video_url
    ]);
    const post = newPost[0];
    // console.log(post);
    res.status(200).send(post);
  },

  getAllPosts: async (req, res) => {
    const db = req.app.get("db");
    const result = await db.get_all_posts();
    // console.log(result);
    res.status(200).send(result);
  },

  getProfilePosts: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const result = await db.get_profile_posts([id]);

    console.log(result);
    res.status(200).send(result);
  },

  getUserPosts: async (req, res) => {
    const db = req.app.get("db");
    const { gamertag } = req.params;
    const result = await db.get_user_posts([gamertag]);
    console.log(result);
    res.status(200).send(result);
  },

  getGamePosts: async (req, res) => {
    const db = req.app.get("db");
    const { game } = req.params;
    const result = await db.get_game_posts([game]);
    console.log(result);
    res.status(200).send(result);
  }
};
