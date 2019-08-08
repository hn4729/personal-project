module.exports = {
  addOrRemoveLike: async (req, res) => {
    const { id } = req.session.user;
    const post_id = req.params.post_id;
    const db = req.app.get("db");

    const result = await db.check_like([post_id, id]);
    const existingLike = result[0];

    if (existingLike) {
      db.remove_like(post_id, id).then(() => {
        res.sendStatus(200);
      });
    } else {
      db.add_like(post_id, id).then(() => {
        res.sendStatus(200);
      });
    }
  },

  getLikes: async (req, res) => {
    const db = req.app.get("db");
    const result = await db.get_likes();
    res.status(200).send(result);
  }
};
