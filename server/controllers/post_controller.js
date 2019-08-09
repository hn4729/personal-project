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

    db.create_post([
      id,
      existingGame.game_id,
      content_text,
      image_url,
      video_url
    ]);
    // console.log(post);
    res.sendStatus(200);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.delete_likes([id]);
    db.delete_post_comments([id]);
    setTimeout(() => {
      db.delete_post([id]);
    }, 150);

    res.sendStatus(200);
  },

  edit: async (req, res) => {
    const { game, image_url, video_url, content_text } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");

    const result = await db.get_game([game]);
    let existingGame = result[0];

    if (!existingGame) {
      const result_2 = await db.insert_new_game([game]);
      existingGame = result_2[0];
    }

    db.update_post([id, image_url, video_url, content_text, game])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  },

  getAllPosts: async (req, res) => {
    const db = req.app.get("db");
    const result = await db.get_all_posts();
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
    res.status(200).send(result);
  },

  getGamePosts: async (req, res) => {
    const db = req.app.get("db");
    const { game } = req.params;
    const result = await db.get_game_posts([game]);
    console.log(result);
    res.status(200).send(result);
  },

  getIndividualPost: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    const result = await db.get_individual_post([id]);
    res.status(200).send(result);
  }
};
