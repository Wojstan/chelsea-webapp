const express = require("express");
const router = express.Router();
const Match = require("../models/Match");

router.get("/:matchId", async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId);
    res.json(match);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/:matchId", async (req, res) => {
  const match = new Match({
    _id: req.params.matchId,
    lineup: [],
    subs: [],
    events: [],
  });
  try {
    const savedMatch = await match.save();

    res.json(savedMatch);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/lineup/:matchId", async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId);
    const newPlayer = req.body.player;

    match.lineup.push(newPlayer);
    match.save();

    res.json(newPlayer);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/subs/:matchId", async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId);
    const newPlayer = req.body.player;

    match.subs.push(newPlayer);
    match.save();

    res.json(newPlayer);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/lineup/:matchId", async (req, res) => {
  try {
    const match = await Match;

    match.updateOne(
      { _id: Number(req.params.matchId), "lineup.id": req.body.id },
      {
        $set: {
          "lineup.$.rating": req.body.rating,
        },
      }
    );

    res.json({ id: req.body.id, rating: req.body.rating });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

module.exports = router;
