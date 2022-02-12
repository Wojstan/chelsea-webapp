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
    _id: req.body._id,
    lineup: req.body.lineup,
    ratings: req.body.ratings,
    goals: req.body.goals,
  });
  try {
    const savedMatch = await match.save();
    res.json(savedMatch);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/lineup/:matchId", async (req, res) => {
  try {
    const updatedMatch = await Match.findByIdAndUpdate(
      { _id: req.params.matchId },
      { $set: { lineup: req.body.lineup } },
      { new: true, useFindAndModify: false }
    );
    res.json(updatedMatch);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/events/:matchId", async (req, res) => {
  try {
    const updatedMatch = await Match.findByIdAndUpdate(
      { _id: req.params.matchId },
      { $set: { goals: req.body.goals } },
      { new: true, useFindAndModify: false }
    );
    res.json(updatedMatch);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
