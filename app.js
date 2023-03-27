const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/authRoutes");

const app = express();

//middleware
app.use(express.json());

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
app.use("/", routes);

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
