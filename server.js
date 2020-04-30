// npm packages this app is using
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

// heroku PORT or localhost/3000
const PORT = process.env.PORT || 3000;

// pull in database tables
const db = require("./models");

// initiate a server app
const app = express();

// logger provided by morgan
app.use(logger("dev"));

// boilerplate for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// define a public folder for app to search for files
app.use(express.static("public"));

// pull mongoose in and connect it either to Heroku MONGODB_URI or database on localhost
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnesstrackerdb", {
    useNewUrlParser: true
});

// routes
// app.use(require("./routes/api.js"));

// POST path, creates a new workout
app.post("/submit-workout", ({ body }, res) => {
    // console.log(`Here app.post/submit-workout: ${body}`);
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// POST path, creates a new exercise and then pushes it onto a workout
app.post("/submit-exercise", ({ body }, res) => {
    // console.log(`Here app.post/submit-exercise: ${body.name}`);
    db.Exercise.create(body)
        .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
        .then(dbExercise => {
            res.json(dbExercise);
        })
        .catch(err => {
            res.json(err);
        });
});

// GET paths, get workouts, get exercises, get workouts populated with exercises details
app.get("/exercises", (req, res) => {
  db.Exercise.find({})
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populated", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    })
});

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
