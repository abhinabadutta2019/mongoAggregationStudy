const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//limit
router.get("/limit-project", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        { $limit: 100 },
        { $match: { eyeColor: { $ne: "blue" } } },
        {
          $group: {
            _id: { eyeColor: "$eyeColor", favoriteFruit: "$favoriteFruit" },
          },
        },
        {
          $sort: { "_id.eyecolor": 1, "_id.favoriteFruit": -1 },
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

//unwind
//unwind breaks array to each arrayMembers smaller parts- and out puts
router.get("/unwind", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        { $match: { eyeColor: { $ne: "blue" } } },
        //
        { $unwind: "$tags" },
        { $project: { name: 1, index: 1, tags: 1 } },
      ])
      .toArray();
    console.log(docs);
    res.send(docs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error fetching documents" });
  }
});

// restucture field with project

router.get("/unwind-then-group", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        //
        { $unwind: "$tags" },
        { $group: { _id: "$tags" } },
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
// [
//   { _id: 'culpa' },         { _id: 'ad' },          { _id: 'duis' },
//   { _id: 'reprehenderit' }, { _id: 'dolore' },      { _id: 'non' },
//   { _id: 'mollit' },        { _id: 'veniam' },      { _id: 'qui' },
// ]

module.exports = router;
