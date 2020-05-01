const router = require("express").Router();

// // example of inserting data into User table
// db.User.create({ name: "Ernest Hemingway" })
//   .then(dbUser => {
//     console.log(dbUser);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

// // example of inserting many into Note table
//   db.Note.insertMany([
//     { title: "Task 1", body: "do thing 1" },
//     { title: "Task 2", body: "do thing 2" },
//     { title: "Task 3", body: "do thing 3" },
//     { title: "Task 4", body: "do thing 4" },
//     { title: "Task 5", body: "do thing 5" }
//  ]);

// // GET paths, get notes, get users, get users populated with notes details
// app.get("/notes", (req, res) => {
//   db.Note.find({})
//     .then(dbNote => {
//       res.json(dbNote);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/user", (req, res) => {
//   db.User.find({})
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/populateduser", (req, res) => {
//   // TODO
//   // =====
//   // Write the query to grab the documents from the User collection,
//   // and populate them with any associated Notes.
//   // TIP: Check the models out to see how the Notes refers to the User
//   db.User.find({})
//     .populate("notes")
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });

// POST path, creates a new note and then pushes it onto a user (in this case, just the single user in user table)
router.post("/submit", ({ body }, res) => {
    console.log("Here app.post/submit");
//   db.Note.create(body)
//     .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
});