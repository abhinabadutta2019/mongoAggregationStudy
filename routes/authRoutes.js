const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//
router.get("/sort", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        // { $match: { age: { $gte: 26 } } },
        { $group: { _id: "$favoriteFruit" } },
        {
          $sort: { _id: 1 },
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

// [
//   {
//       "_id": "apple"
//   },
//   {
//       "_id": "banana"
//   },
//   {
//       "_id": "strawberry"
//   }
// ]

//
//group then sort
router.get("/match-then-goup-then-sort", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        { $match: { eyeColor: { $ne: "blue" } } },
        {
          $group: {
            _id: { eyeColor: "$eyeColor", favoriteFruit: "$favoriteFruit" },
          },
        },
        {
          $sort: { "_id.eyeColor": 1, "_id.favoriteFruit": -1 },
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

// [
//   { _id: { eyeColor: 'brown', favoriteFruit: 'strawberry' } },
//   { _id: { eyeColor: 'brown', favoriteFruit: 'banana' } },
//   { _id: { eyeColor: 'brown', favoriteFruit: 'apple' } },
//   { _id: { eyeColor: 'green', favoriteFruit: 'strawberry' } },
//   { _id: { eyeColor: 'green', favoriteFruit: 'banana' } },
//   { _id: { eyeColor: 'green', favoriteFruit: 'apple' } }
// ]

module.exports = router;
