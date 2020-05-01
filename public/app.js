
function getWorkouts() {    
    document.getElementById("workout-section").style.display = "block";
    document.getElementById("exercise-section").style.display = "none";

    // get all the workouts, order by create date desc
    fetch("/populated")
        .then(function (response) {
            if (response.status !== 200) {
                console.log("uh-oh. problem getting workouts")
                return;
            }
            response.json().then(function (data) {
                displayWorkouts(data);
            });
        })
        .catch(function (err) {
            console.log("fetch error : ", err);
        });
}

function displayWorkouts(workouts) {
    // clear out any current content
    const latestWO = document.getElementById("latest-wo");
    latestWO.innerHTML = "";
    const previousWO = document.getElementById("previous-wo");
    previousWO.innerHTML = "";

    // build card for the newest workout created
    for (let index = 0; index < workouts.length; index++) {
        const workout = workouts[index];
        
        // create a new card and all it's pieces (header, body, footer) for styling
        let newCardEl = document.createElement("div");
        newCardEl.setAttribute("class", "card");
        
        let newCardHeaderEl = document.createElement("div");
        newCardHeaderEl.setAttribute("class", "card-header");
        newCardHeaderEl.innerText = `${workout.title}`;
        
        let newCardBodyEl = document.createElement("div");
        newCardBodyEl.setAttribute("class", "card-body");

        // TODO: this will be a loop of exercises
        const exercises = workout.exercises;
        for (let index2 = 0; index2 < exercises.length; index2++) {
            const exercise = exercises[index2];
            let newExerciseTitleEl = document.createElement("h3");
            newExerciseTitleEl.setAttribute("class", "card-title");
            newExerciseTitleEl.innerText = `${exercise.name}, ${exercise.type}`;
            let newExerciseTextEl = document.createElement("p");
            newExerciseTextEl.setAttribute("class", "card-text");
            let details = "";
            if(exercise.weight) details += `wgt: ${exercise.weight} `;
            if(exercise.reps) details += `reps: ${exercise.reps} `;
            if(exercise.sets) details += `sets: ${exercise.sets} `;
            if(exercise.duration) details += `duration: ${exercise.duration} `;
            if(exercise.cardio && exercise.distance) details += `distance: ${exercise.distance} `;
            newExerciseTextEl.innerText = details;
            
            newCardBodyEl.append(newExerciseTitleEl);
            newCardBodyEl.append(newExerciseTextEl);
        }

        let newAddBtnEl = document.createElement("button");
        newAddBtnEl.setAttribute("class", "btn btn-sm customBtn addExerciseBtn");
        // newAddBtnEl.setAttribute("href", "exercise.html");
        newAddBtnEl.setAttribute("id",`${workout._id}`);
        newAddBtnEl.innerText = `Add new exercise`;
        newAddBtnEl.addEventListener("click", toggleExerciseInput);
        
        let newCardFooterEl = document.createElement("div");
        newCardFooterEl.setAttribute("class", "card-footer");
        let newLargeEl = document.createElement("large");
        newLargeEl.setAttribute("class", "text-muted");
        let createdDate = workout.createdAt.substr(0,10);
        newLargeEl.innerText = `Workout created ${createdDate}`;
        newCardFooterEl.append(newLargeEl);

        newCardEl.append(newCardHeaderEl);
        newCardEl.append(newCardBodyEl);
        newCardEl.append(newAddBtnEl);
        newCardEl.append(newCardFooterEl);

        if (index === 0) {
            latestWO.append(newCardEl);
        } else {
            previousWO.append(newCardEl);
        }
    }
}

function toggleExerciseInput(event) {
    // the button adding an exercise to a workout has an id matching the workout id
    const workoutID = event.target.id;
    
    const hiddenFieldEl = document.getElementById("hiddenID");
    hiddenFieldEl.setAttribute("value",`${workoutID}`);

    // hide the workout section, unhide the exercise section
    document.getElementById("workout-section").style.display = "none";
    document.getElementById("exercise-section").style.display = "block";
}

getWorkouts();
