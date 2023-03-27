const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// /match-group-by

router.get("/match-group-by", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        { $match: { favoriteFruit: "banana" } },
        {
          $group: {
            _id: { age: "$age", eyeColor: "$eyeColor" },
          },
        },
      ])
      .toArray();
    console.log(docs);
    res.send(docs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error fetching documents" });
  }
});

//

// /match-group-by-also-adding-match

router.get("/match-group-by-also-adding-match", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        { $match: { gender: "female" } },
        {
          $group: {
            _id: { age: "$age", eyeColor: "$eyeColor", gender: "$gender" },
          },
        },
      ])
      .toArray();
    console.log(docs);
    res.send(docs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error fetching documents" });
  }
});

// //output
// [
//   { _id: { age: 22, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 33, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 27, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 33, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 25, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 37, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 37, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 22, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 36, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 21, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 25, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 34, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 37, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 31, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 26, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 28, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 34, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 25, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 28, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 24, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 22, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 34, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 20, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 30, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 20, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 35, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 35, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 31, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 31, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 29, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 20, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 32, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 21, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 24, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 30, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 26, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 38, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 39, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 23, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 23, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 23, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 35, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 32, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 28, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 40, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 38, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 30, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 24, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 40, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 29, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 26, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 40, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 27, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 29, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 39, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 38, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 33, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 36, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 27, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 32, eyeColor: 'blue', gender: 'female' } },
//   { _id: { age: 21, eyeColor: 'green', gender: 'female' } },
//   { _id: { age: 39, eyeColor: 'brown', gender: 'female' } },
//   { _id: { age: 36, eyeColor: 'green', gender: 'female' } }
// ]

module.exports = router;
