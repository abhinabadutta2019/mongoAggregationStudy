const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//

//count

router.get("/count", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        {
          $count: "total",
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

// [ { allDocumentsCount: 1000 } ]

//
router.get("/group-then-count", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        { $group: { _id: { eyeColor: "$eyeColor", age: "$age" } } },
        {
          $count: "eyeColorAndAge",
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

// [ { eyeColorAndAge: 63 } ]

//
router.get("/match-then-group-then-count", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        { $match: { age: { $gte: 26 } } },
        { $group: { _id: { eyeColor: "$eyeColor", age: "$age" } } },
        {
          $count: "matchEyeColorAndAge",
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

//[ { matchEyeColorAndAge: 45 } ]
module.exports = router;
