const express = require("express");
// const mongoose = require("mongoose");
const Person = require("./Persons.json");
const app = express();

const mongoose = require("mongoose");
const fs = require("fs");

//middleware
app.use(express.json());

const data = JSON.parse(fs.readFileSync("Persons.json", "utf8"));

// data = Object.keys(data[0]).registered;

// console.log(data[0]["registered"]);

//
mongoose
  .connect("mongodb://127.0.0.1:27017/Persons", { useNewUrlParser: true })
  .then(() => {
    return mongoose.connection.dropDatabase();
  })
  .then(() => {
    //for loop to add each object of this array of object
    for (let i = 0; i < data.length; i++) {
      const person = data[i];
      //   console.log(person);
      //
      //adding new Date- before the date key/value-
      person.registered = new Date(person.registered);
      //insert data to database
      mongoose.connection.collection("16th-march").insertOne(person);
    }
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });
