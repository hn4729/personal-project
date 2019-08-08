module.exports = {
  getGames: async (req, res) => {
    const db = req.app.get("db");
    const result = await db.get_all_games();
    res.status(200).send(result);
  }
};
