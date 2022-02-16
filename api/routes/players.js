const express = require('express');
const router = express.Router();
const Player = require("../models/Player");

router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/', (req, res) => {
  const player = new Player({
    _id: req.body.id,
    name: req.body.name,
    last: req.body.last,
    number: req.body.number
  })
  player.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    })

})

module.exports = router;