const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//"out" stage -- outputs
// $out replaces the specified collection if it exists.

////
//type-unary operator
//ei field er -"type " gulo- project korche ba show korche
router.get("/type-unary", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        // { $limit: 100 },
        // { $match: { eyeColor: { $ne: "blue" } } },
        {
          $project: {
            name: 1,
            nameType: { $type: "$name" },
            ageType: { $type: "$age" },
            tagsType: { $type: "$tags" },
            nameType: { $type: "$company" },
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
// {
//   _id: new ObjectId("642205f4ae7842721f49a4fc"),
//   name: 'Aurelia Gonzales',
//   nameType: 'object',
//   ageType: 'int',
//   tagsType: 'array'
// },
// {
//   _id: new ObjectId("642205f4ae7842721f49a500"),
//   name: 'Hays Wise',
//   nameType: 'object',
//   ageType: 'int',
//   tagsType: 'array'
// },
// {
//   _id: new ObjectId("642205f4ae7842721f49a506"),
//   name: 'Grace Larson',
//   nameType: 'object',
//   ageType: 'int',
//   tagsType: 'array'
// },

// ////accumulator -sum

// router.get("/accumutae-group-unwind", async (req, res) => {
//   const collection = mongoose.connection.collection("persons");

//   try {
//     const docs = await collection
//       .aggregate([
//         // { $match: { eyeColor: { $ne: "blue" } } },
//         //
//         { $unwind: "$tags" },
//         { $group: { _id: "$tags", count: { $sum: 1 } } },
//         // { $project: { name: 1, index: 1, tags: 1 } },
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
// //   { _id: 'aliqua', count: 52 },
// //   { _id: 'consequat', count: 64 },
// //   { _id: 'pariatur', count: 58 },
// //   { _id: 'elit', count: 54 },
// //   { _id: 'fugiat', count: 52 },
// //   { _id: 'voluptate', count: 52 },
// //   { _id: 'nisi', count: 48 },]

// //accumulator avg
// //avarage age -grouped by-favourite fruit
// router.get("/accumutae-avg", async (req, res) => {
//   const collection = mongoose.connection.collection("persons");

//   try {
//     const docs = await collection
//       .aggregate([
//         // { $match: { eyeColor: { $ne: "blue" } } },
//         //
//         // { $unwind: "$tags" },
//         { $group: { _id: "$favoriteFruit", avgAge: { $avg: "$age" } } },
//         // { $project: { name: 1, index: 1, tags: 1 } },
//       ])
//       .toArray();
//     console.log(docs);
//     res.send(docs);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Error fetching documents" });
//   }
// });

// //[
// //   {
// //     "_id": "banana",
// //     "avgAge": 29.707964601769913
// // },
// // {
// //     "_id": "apple",
// //     "avgAge": 29.680473372781066
// // },
// // {
// //     "_id": "strawberry",
// //     "avgAge": 30.13003095975232
// // }
// // ]

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
