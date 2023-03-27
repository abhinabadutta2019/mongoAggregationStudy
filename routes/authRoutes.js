const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//getting data while index <10 and sort them by index order
router.get("/index-less-than-10", (req, res) => {
  const collection = mongoose.connection.collection("16th-march");

  collection
    .find({ index: { $lt: 10 } })
    .toArray()
    .then((docs) => {
      const sortedDocs = docs.sort((a, b) => a.index - b.index);
      console.log(sortedDocs);
      res.send(sortedDocs);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Error fetching documents" });
    });
});

module.exports = router;
