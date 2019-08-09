module.exports = {
  create: async (req, res) => {
    const { post_id } = req.params;
    const { comment_text, giphy } = req.body;
    const { id } = req.session.user;
    const db = req.app.get("db");

    db.add_comment([post_id, id, comment_text, giphy]).then(() => {
      res.sendStatus(200);
    });
  },

  deleteComment: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.delete_comment([id]).then(() => {
      res.sendStatus(200);
    });
  },

  updateComment: async (req, res) => {
    const { id } = req.params;
    const { comment_text, giphy } = req.body;
    const db = req.app.get("db");

    db.update_comment([id, comment_text, giphy]).then(() => {
      res.sendStatus(200);
    });
  },

  getComments: async (req, res) => {
    const { post_id } = req.params;
    const db = req.app.get("db");

    const result = await db.get_comments([post_id]);
    res.status(200).send(result);
  },

  getCommentCount: async (req, res) => {
    const db = req.app.get("db");
    const result = await db.get_comment_count();
    res.status(200).send(result);
  }
};
