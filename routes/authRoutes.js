const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//

// /match-group-by-also-adding-match

router.get("/match-group-by-also-adding-match", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        {
          $group: {
            _id: { eyeColor: "$eyeColor", age: "$age" },
          },
        },
        { $match: { "_id.eyeColor": "green" } },
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
//   { _id: { eyeColor: 'green', age: 24 } },
//   { _id: { eyeColor: 'green', age: 27 } },
//   { _id: { eyeColor: 'green', age: 30 } },
//   { _id: { eyeColor: 'green', age: 37 } },
//   { _id: { eyeColor: 'green', age: 34 } },
//   { _id: { eyeColor: 'green', age: 20 } },
//   { _id: { eyeColor: 'green', age: 39 } },
//   { _id: { eyeColor: 'green', age: 28 } },
//   { _id: { eyeColor: 'green', age: 25 } },
//   { _id: { eyeColor: 'green', age: 29 } },
//   { _id: { eyeColor: 'green', age: 26 } },
//   { _id: { eyeColor: 'green', age: 33 } },
//   { _id: { eyeColor: 'green', age: 38 } },
//   { _id: { eyeColor: 'green', age: 23 } },
//   { _id: { eyeColor: 'green', age: 40 } },
//   { _id: { eyeColor: 'green', age: 21 } },
//   { _id: { eyeColor: 'green', age: 35 } },
//   { _id: { eyeColor: 'green', age: 32 } },
//   { _id: { eyeColor: 'green', age: 22 } },
//   { _id: { eyeColor: 'green', age: 36 } },
//   { _id: { eyeColor: 'green', age: 31 } }
// ]

module.exports = router;
