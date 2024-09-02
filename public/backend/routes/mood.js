const express = require("express");
const router = express.Router();
const db = require("../models/mood");

router.post("/", (req, res) => {
  const { mood } = req.body;
  const query = `INSERT INTO moods(mood) VALUES(?)`;

  db.run(query, [mood], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    res.send({ id: this.lastID, mood: mood });
  });
});

router.get("/", (req, res) => {
  const query = `SELECT * FROM moods`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    res.send(rows);
  });
});

router.put("/:id", (req, res) => {
  const { mood } = req.body;
  const { id } = req.params;
  const query = `UPDATE moods SET mood = ? WHERE id = ?`;

  db.run(query, [mood, id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    res.send({ id: id, mood: mood });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM moods WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    res.send({ changes: this.changes });
  });
});

module.exports = router;