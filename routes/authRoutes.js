const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//
router.get("/project", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        // { $match: { age: { $gte: 26 } } },
        { $project: { isActive: 1, name: 1 } },
        // {
        //   $sort: { _id: 1 },
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
// {
//   _id: new ObjectId("642205f4ae7842721f49a5c4"),
//   name: 'Constance Alvarado',
//   isActive: false
// },
// {
//   _id: new ObjectId("642205f4ae7842721f49a5c6"),
//   name: 'Gibbs Carr',
//   isActive: false
// },
// // ... 900 more items
// ]

//"/project-dont-show-id"
//
router.get("/project-dont-show-id", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        // { $match: { age: { $gte: 26 } } },
        { $project: { _id: 0, isActive: 1, name: 1 } },
        // {
        //   $sort: { _id: 1 },
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

// restucture field with project

router.get("/restucture-field-with-project", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .aggregate([
        {
          $project: {
            _id: 0,
            index: 1,
            name: 1,
            info: {
              eyes: "$eyeColor",
              company: "$company.title",
              country: "$company.location.country",
            },
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
// [
//   {
//     index: 0,
//     name: 'Aurelia Gonzales',
//     info: { eyes: 'green', company: 'YURTURE', country: 'USA' }
//   },
//   {
//     index: 2,
//     name: 'Hays Wise',
//     info: { eyes: 'green', company: 'EXIAND', country: 'France' }
//   },
//   {
//     index: 5,
//     name: 'Grace Larson',
//     info: { eyes: 'blue', company: 'OVOLO', country: 'USA' }
//   }]

module.exports = router;
