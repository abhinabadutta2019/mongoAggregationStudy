const express = require("express");
// const mongoose = require("mongoose");
const Person = require("./Persons.json");
const app = express();

const mongoose = require("mongoose");

//middleware
app.use(express.json());

const fs = require("fs");
// data
const data = JSON.parse(fs.readFileSync("Persons.json", "utf8"));

//
// database connection
const dbURI = "mongodb://127.0.0.1:27017/Persons";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//routes

app.get("/index-less-than-10", (req, res) => {
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

//
// mongoose
//   .connect("mongodb://127.0.0.1:27017/Persons", { useNewUrlParser: true })
//   .then(() => {
//     return mongoose.connection.dropDatabase();
//   })
//   .then(() => {
//     //for loop to add each object of this array of object
//     for (let i = 0; i < data.length; i++) {
//       const person = data[i];
//       //   console.log(person);
//       //
//       //adding new Date- before the date key/value-
//       person.registered = new Date(person.registered);
//       //insert data to database
//       mongoose.connection.collection("16th-march").insertOne(person);
//     }
//   })
//   .catch((err) => {
//     console.error(err);
//     mongoose.connection.close();
//   });
