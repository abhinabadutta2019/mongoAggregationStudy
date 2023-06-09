const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/authRoutes");

const app = express();

//middleware
app.use(express.json());

// database connection
const dbURI = "mongodb://127.0.0.1:27017/mongo-aggregation-practice";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes;
app.use("/", routes);
////////////////////////////////////////

// const fs = require("fs");
// const data = JSON.parse(fs.readFileSync("Persons.json", "utf8"));

//adding the data to database
// mongoose
//   .connect("mongodb://127.0.0.1:27017/mongo-aggregation-practice", {
//     useNewUrlParser: true,
//   })
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
//       mongoose.connection.collection("persons").insertOne(person);
//     }
//   })
//   .catch((err) => {
//     console.error(err);
//     mongoose.connection.close();
//   });
