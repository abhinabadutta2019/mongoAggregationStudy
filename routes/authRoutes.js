const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//getting data while index <5 and sort them by index order
router.get("/index-less-than-5", async (req, res) => {
  const collection = mongoose.connection.collection("persons");

  try {
    const docs = await collection
      .find({ index: { $lt: 5 } })
      .sort({ index: -1 })
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
