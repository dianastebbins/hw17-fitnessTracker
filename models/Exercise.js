// use mongoose and get the Schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define an Exercise Schema
const ExerciseSchema = new Schema({
  name: {
      type: String, 
      trim: true,
      required: "exercise name is required"
  },
  type: {
      type: String, 
      trim: true,
      required: "exercise type is required"
  },
  weight: {
      type: Number
  },
  sets: {
      type: Number
  },
  reps: {
      type: Number
  },
  duration: {
      type: Number
  },
  cardio: { // If the exercise is a cardio exercise, I should be able to track my distance traveled.
      type: Boolean,
      default: false
  },
  distance: {
      type: Number
  }
});

// example method in case it's needed
ExerciseSchema.methods.dosomething = function(){
    this.cardio = true;
    return this.cardio;
}

// create the Exercise collection and export it for use
const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;
