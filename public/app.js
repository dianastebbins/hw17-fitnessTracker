
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

function displayWorkouts(workouts) {
    // clear out any current content
    const latestWO = document.getElementById("latest-wo");
    latestWO.innerHTML = "";
    const previousWO = document.getElementById("previous-wo");
    previousWO.innerHTML = "";

    // build card for the newest workout created
    for (let index = 0; index < workouts.length; index++) {
        let createdDate = workouts[index].createdAt;
        console.log(createdDate);

        // create a new card and all it's pieces (header, body, footer) for styling
        let newCardEl = document.createElement("div");
        newCardEl.setAttribute("class", "card");

        let newCardHeaderEl = document.createElement("div");
        newCardHeaderEl.setAttribute("class", "card-header");
        newCardHeaderEl.innerText = `${workouts[index].title}`;

        let newCardBodyEl = document.createElement("div");
        newCardBodyEl.setAttribute("class", "card-body");

        // TODO: this will be a loop of exercises
        let newExerciseTitleEl = document.createElement("p");
        newExerciseTitleEl.setAttribute("class", "card-title");
        newExerciseTitleEl.innerText = "Exercise 1 Name";
        let newExerciseTextEl = document.createElement("p");
        newExerciseTextEl.setAttribute("class", "card-text");
        newExerciseTextEl.innerText = "Exercise 1 Details";
        newCardBodyEl.append(newExerciseTitleEl);
        newCardBodyEl.append(newExerciseTextEl);

        // let newAddBtnEl = document.createElement("button");
        // newAddBtnEl.setAttribute("class", "btn btn-sm customBtn addExerciseBtn");
        // newAddBtnEl.setAttribute("type", "button");
        // newAddBtnEl.setAttribute("data-id", `${workouts[index]._id}`);
        // newAddBtnEl.innerText = `Add new exercise`;
        let newAddBtnEl = document.createElement("a");
        newAddBtnEl.setAttribute("class", "btn btn-sm customBtn addExerciseBtn");
        newAddBtnEl.setAttribute("href", "exercise.html")
        newAddBtnEl.innerText = `Add new exercise`;
        // also create an event listener for this new button
        // newAddBtnEl.addEventListener("click", getNewExerciseEntry);

        // <div class="card-footer"><large class="text-muted">${kudos}</large>
        let newCardFooterEl = document.createElement("div");
        newCardFooterEl.setAttribute("class", "card-footer");
        //<large class="text-muted">${kudos}</large>
        let newLargeEl = document.createElement("large");
        newLargeEl.setAttribute("class", "text-muted");
        newLargeEl.innerText = `Workout created on ${createdDate}`;
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

function getNewExerciseEntry() {
    console.log("HERE !!!")

}

getWorkouts();
