const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// group- by age// country

router.get("/group-by-country", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        {
          //"/group-by-age"

          // $group: {
          //   _id: "$age",
          // },

          //"/group-by-country"
          $group: {
            _id: "$company.location.country",
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

// group- by multiple fields

router.get("/group-by-multiple-field", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        {
          $group: {
            _id: { eyeColorF: "$eyeColor", favoriteFruitF: "$favoriteFruit" },
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

//output

// [
//   { _id: { eyeColorF: 'green', favoriteFruitF: 'apple' } },
//   { _id: { eyeColorF: 'green', favoriteFruitF: 'strawberry' } },
//   { _id: { eyeColorF: 'blue', favoriteFruitF: 'strawberry' } },
//   { _id: { eyeColorF: 'green', favoriteFruitF: 'banana' } },
//   { _id: { eyeColorF: 'brown', favoriteFruitF: 'strawberry' } },
//   { _id: { eyeColorF: 'blue', favoriteFruitF: 'apple' } },
//   { _id: { eyeColorF: 'brown', favoriteFruitF: 'apple' } },
//   { _id: { eyeColorF: 'brown', favoriteFruitF: 'banana' } },
//   { _id: { eyeColorF: 'blue', favoriteFruitF: 'banana' } }
// ]
//
module.exports = router;
