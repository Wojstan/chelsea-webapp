const express = require("express");
const router = express.Router();
const Match = require("../models/Match");

const callback = (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
};

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

router.patch("/subs/:matchId", async (req, res) => {
  try {
    const match = await Match;

    match.updateOne(
      { _id: Number(req.params.matchId), "subs.id": req.body.id },
      {
        $set: {
          "subs.$.rating": req.body.rating,
        },
      }
    );

    res.json({ id: req.body.id, rating: req.body.rating });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

router.post("/events/:matchId", async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId);
    const newEvent = req.body.event;

    match.events.push(newEvent);
    match.save();

    res.json(newEvent);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/events/goal/:matchId", async (req, res) => {
  try {
    const match = await Match;

    console.log(req.params.matchId, req.body);

    match.updateOne(
      { _id: Number(req.params.matchId), "events.id": req.body.id },
      {
        $set: {
          "events.$.goal": req.body.goal,
        },
      },
      (err, res) => callback(err, res)
    );

    res.json({ id: req.body.id, goal: req.body.goal });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

router.patch("/events/assist/:matchId", async (req, res) => {
  try {
    const match = await Match;

    console.log(req.body);

    match.updateOne(
      { _id: Number(req.params.matchId), "events.id": req.body.id },
      {
        $set: {
          "events.$.assist": req.body.assist,
        },
      },
      (err, res) => callback(err, res)
    );

    res.json({ id: req.body.id, assist: req.body.assist });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

module.exports = router;
