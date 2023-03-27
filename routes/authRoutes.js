const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// //getting data while index <5 and sort them by index order
// router.get("/index-less-than-5", async (req, res) => {
//   const collection = mongoose.connection.collection("persons");

//   try {
//     const docs = await collection
//       .find({ index: { $lt: 5 } })
//       .sort({ index: -1 })
//       .toArray();
//     console.log(docs);
//     res.send(docs);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Error fetching documents" });
//   }
// });

// aggregate
router.get("/index-less-than-5", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        {
          $match: {
            index: { $lt: 5 },
          },
        },
        {
          $sort: {
            index: -1,
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

// age grater than 39
router.get("/age-greater-than-39", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        {
          $match: {
            age: { $gt: 39 },
          },
        },
      ])
      .toArray();
    console.log(docs.length);
    res.send(docs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error fetching documents" });
  }
});

// gender female age grater than 39
router.get("/female-age-gt-39", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        {
          $match: {
            //gender female age grater than 39
            // $and: [{ gender: "female" }, { age: { $gt: 39 } }],

            //gender female age grater than 39 and tags array size 3
            $and: [
              { gender: "female" },
              { age: { $gt: 39 } },
              { tags: { $size: 3 } },
            ],
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
module.exports = router;
