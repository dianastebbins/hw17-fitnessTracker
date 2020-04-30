// use mongoose and get the Schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a Workout Schema
const WorkoutSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: "workout name is required"
  },
  exercises: [
    {
      type: Schema.Types.ObjectId, // equivalent of hasMany in sequelize
      ref: "Exercise"
    }
  ]
});

// create the Workout collection and export it for use
const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;