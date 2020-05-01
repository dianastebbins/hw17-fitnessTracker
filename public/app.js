function getWorkouts() {
    // get all the workouts, order by create date desc
    fetch("/workouts")
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

function displayWorkouts(workouts){
    // clear out any current content
    const latestWO = document.getElementById("latest-wo");
    latestWO.innerHTML = "";
    const previousWO = document.getElementById("previous-wo");
    previousWO.innerHTML = "";

    // build card for the newest workout created
    if(workouts.length > 0){
        latestWO.insertAdjacentHTML("beforeend", buildWorkoutCard(workouts[0], true));
    }

    // build card(s) for older workouts
    if(workouts.length > 1){
        for (let index = 1; index < workouts.length; index++) {
            previousWO.insertAdjacentHTML("beforeend",buildWorkoutCard(workouts[index], false));
        }
    }
}

function buildWorkoutCard(workout, addKudos) {
    // add kudos message if indicated
    const kudos = addKudos ? "Amazing! Keep going!!" : "...";
    
    // show the date this workout was created
    let createdDate = workout.createdAt; // convert this to something prettier...

    // build all the details of the actual exercises associated to this workout
    let exerciseDetails = buildExerciseDetails(workout.exercises)

    // put it all together...
    let html = `
    <div class="card">
        <div class="card-header">
            ${workout.title} created on ${createdDate}.
        </div>
        <div class="card-body" data-id="${workout._id}>
            ${exerciseDetails}
        </div>
        <div class="card-footer">
            <large class="text-muted">${kudos}</large>
        </div>
    </div>`
    return html;
};

// display the particulars for every exercise
function buildExerciseDetails(exercises) {
    let html = "";

    // exercises.forEach(exercise => {
        html += `
        <p class="card-title">Exercise 1 Name</p>
        <p class="card-text">Exercise 1 Details</p>`        
    // });

    return html;
}


getWorkouts();