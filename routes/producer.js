const Producer = require("../models/Producer");
const router = require("express").Router();
const auth = require("./auth");

//Get all producers
router.get("/", async (req, res) => {
  try {
    const producers = await Producer.find({});
    if (!producers.length) {
      return res.status(404).send("No producers found!");
    } else {
      return res.status(200).send(producers);
    }
  } catch (error) {
    return res.status(500).send("Uh oh, something is wrong, please try again!");
  }
});

//Get custom producer
//By DJ Mag Rating
router.get("/:rate", async (req, res) => {
  try {
    const producers = await Producer.find({
      djmagrating: parseInt(req.params.rate)
    }); // Returns [] if not found
    if (!producers.length) {
      return res.status(404).send("Can't find the producer with this rating!");
    } else {
      return res.status(200).send(producers);
    }
  } catch (error) {
    return res.status(500).send("Uh oh, something is wrong, please try again!");
  }
});

//Get custom producer
//By genres
router.get("/genres/:genres", async (req, res) => {
  const genres = req.params.genres.split(",");
  let result = [];
  try {
    const producers = await Producer.find({});
    producers.forEach(producer => {
      if (genres.every(genre => producer.genres.includes(genre))) {
        result.push(producer);
      }
    });
    if (!result.length) {
      return res
        .status(404)
        .send("Can't find any producer playing this set of genres!");
    } else {
      return res.status(200).send(result);
    }
  } catch (error) {
    return res
      .status(500)
      .send("Uh oh, something is wrong, please try agains!");
  }
});

//Add a producer
router.post("/", auth, async (req, res) => {
  if (!req.is("application/json")) {
    return res.status(400).send("Please send JSON data!");
  }
  const { name, genres, djmagrating } = req.body;
  const producer = new Producer({
    name,
    genres,
    djmagrating
  });
  try {
    await producer.save();
    return res.status(201).send(producer);
  } catch (error) {
    return res
      .status(500)
      .send("Uh oh, something is wrong, please try agains!");
  }
});

//Update a producer
router.put("/:id", auth, async (req, res) => {
  if (!req.is("application/json")) {
    return res.status(400).send("Please send JSON data!");
  }
  try {
    // Return the updated producer
    const producer = await Producer.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(201).send(producer);
  } catch (error) {
    return res.status(404).send("Can't find this producer!");
  }
});

//Delete a producer
router.delete("/:id", auth, async (req, res) => {
  try {
    const producer = await Producer.findOneAndDelete({ _id: req.params.id });
    return res.status(204);
  } catch (error) {
    return es.status(404).send("Can't find this producer!");
  }
});
module.exports = router;
