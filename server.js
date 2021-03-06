// npm packages this app is using
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
// const compress = require("compression");

// heroku PORT or localhost/3000
const PORT = process.env.PORT || 3000;

// pull in database tables
const db = require("./models");

// initiate a server app
const app = express();

// logger provided by morgan
app.use(logger("dev"));

// keeping the app size smaller
// app.use(compression());

// boilerplate for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// define a public folder for app to search for files
app.use(express.static("public"));

// pull mongoose in and connect it either to Heroku MONGODB_URI or database on localhost
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnesstrackerdb", {
  useNewUrlParser: true
});

// POST path, creates a new workout
app.post("/submit-workout", ({ body }, res) => {
  console.log("here");
  db.Workout.create(body)
    .then(dbWorkout => {
      // res.json(dbWorkout);
      res.redirect("/");
    })
    .catch(err => {
      res.json(err);
    });
});

// POST path, creates a new exercise and then pushes it onto a workout
app.post("/submit-exercise", (req, res) => {
  const body = req.body;
  const workoutID = body.workoutID;
  const newExercise = {
    name: body.name,
    type: body.type,
    weight: body.weight,
    sets: body.sets,
    reps: body.reps,
    duration: body.duration,
    cardio: body.distance ? true : false,
    distance: body.distance
  }
  
  db.Exercise.create(newExercise)
    .then(({ _id }) => db.Workout.findOneAndUpdate({ _id: workoutID}, { $push: { exercises: _id } }, { new: true }))
    .then(dbExercise => {
      res.redirect("/");
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
    .sort('-createdAt')
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populated", (req, res) => {
  db.Workout.find({})
    .sort('-createdAt')
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
