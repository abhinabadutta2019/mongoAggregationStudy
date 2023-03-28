const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//accumulator -sum
//same age er kotojon royeche
router.get("/accumulator-sum", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        // { $limit: 100 },
        // { $match: { eyeColor: { $ne: "blue" } } },
        {
          $group: {
            _id: "$age",
            count: { $sum: 1 },
          },
        },
        // {
        //   $sort: { "_id.eyecolor": 1, "_id.favoriteFruit": -1 },
        // },
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
//   { _id: 33, count: 50 }, { _id: 32, count: 38 },
//   { _id: 38, count: 49 }, { _id: 28, count: 44 },
//   { _id: 23, count: 57 }, { _id: 35, count: 51 },
//   { _id: 20, count: 46 }, { _id: 40, count: 38 },
//   { _id: 29, count: 44 }, { _id: 22, count: 58 },
//   { _id: 26, count: 51 }, { _id: 25, count: 50 },
//   { _id: 37, count: 49 }, { _id: 34, count: 44 },
//   { _id: 30, count: 38 }, { _id: 36, count: 36 },
//   { _id: 21, count: 58 }, { _id: 31, count: 53 },
//   { _id: 27, count: 42 }, { _id: 39, count: 65 },
//   { _id: 24, count: 39 }
// ]

////accumulator -sum

router.get("/accumutae-group-unwind", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        // { $match: { eyeColor: { $ne: "blue" } } },
        //
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        // { $project: { name: 1, index: 1, tags: 1 } },
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
//   { _id: 'aliqua', count: 52 },
//   { _id: 'consequat', count: 64 },
//   { _id: 'pariatur', count: 58 },
//   { _id: 'elit', count: 54 },
//   { _id: 'fugiat', count: 52 },
//   { _id: 'voluptate', count: 52 },
//   { _id: 'nisi', count: 48 },]

//accumulator avg
//avarage age -grouped by-favourite fruit
router.get("/accumutae-avg", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        // { $match: { eyeColor: { $ne: "blue" } } },
        //
        // { $unwind: "$tags" },
        { $group: { _id: "$favoriteFruit", avgAge: { $avg: "$age" } } },
        // { $project: { name: 1, index: 1, tags: 1 } },
      ])
      .toArray();
    console.log(docs);
    res.send(docs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error fetching documents" });
  }
});

//[
//   {
//     "_id": "banana",
//     "avgAge": 29.707964601769913
// },
// {
//     "_id": "apple",
//     "avgAge": 29.680473372781066
// },
// {
//     "_id": "strawberry",
//     "avgAge": 30.13003095975232
// }
// ]

// //unwind
// //unwind breaks array to each arrayMembers smaller parts- and out puts
// router.get("/unwind", async (req, res) => {
//   const collection = mongoose.connection.collection("persons");

//   try {
//     const docs = await collection
//       .aggregate([
//         { $match: { eyeColor: { $ne: "blue" } } },
//         //
//         { $unwind: "$tags" },
//         { $project: { name: 1, index: 1, tags: 1 } },
//       ])
//       .toArray();
//     console.log(docs);
//     res.send(docs);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Error fetching documents" });
//   }
// });

// // restucture field with project

// router.get("/unwind-then-group", async (req, res) => {
//   const collection = mongoose.connection.collection("persons");

//   try {
//     const docs = await collection
//       .aggregate([
//         //
//         { $unwind: "$tags" },
//         { $group: { _id: "$tags" } },
//       ])
//       .toArray();
//     console.log(docs);
//     res.send(docs);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Error fetching documents" });
//   }
// });

// //
// // [
// //   { _id: 'culpa' },         { _id: 'ad' },          { _id: 'duis' },
// //   { _id: 'reprehenderit' }, { _id: 'dolore' },      { _id: 'non' },
// //   { _id: 'mollit' },        { _id: 'veniam' },      { _id: 'qui' },
// // ]

module.exports = router;
