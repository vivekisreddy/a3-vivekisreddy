document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("exercise-form");
    const tableBody = document.querySelector("#exercise-table tbody");
    const editIndex = document.getElementById("edit-index");


    if (!form) {
        console.error("Exercise form element not found");
        return;
    }
    let exercises = []; // Store the fetched exercises globally

    const fetchExercises = async () => {
        try {
            const response = await fetch("/data"); // Ensure this endpoint is correct
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Error fetching exercises:", errorMessage);
                return;
            }

            exercises = await response.json();
            console.log(exercises); // Log the response to see the data
            updateTable(exercises);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData); // Convert FormData to an object

        console.log(data); // Log the data being sent to the backend

        try {
            if (editIndex.value !== "") {
                await fetch(`/update/${editIndex.value}`, {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
                });
            } else {
                await fetch("/add", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
                });
            }
            await fetchExercises();
            editIndex.value = "";
            form.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    });

    // Edit button event delegation
    document.querySelector("table").addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("edit-btn")) {
            const exerciseId = event.target.getAttribute("data-id");
            editExercise(exerciseId); // Call the edit function with the correct ID
        }
    });

    function editExercise(exerciseId) {
        const exercise = exercises.find((ex) => ex._id === exerciseId); // Find the exercise by ID
        if (exercise) {
            // Populate your form or fields with the exercise data
            document.getElementById("exerciseName").value = exercise.name;
            document.getElementById("exerciseDuration").value = exercise.duration;
            document.getElementById("exerciseNotes").value = exercise.notes || ''; // Ensure notes are set even if empty
            editIndex.value = exercise._id; // Set the hidden input field for editing
        }
    }

    const updateTable = (exercises) => {
        const table = document.querySelector("table tbody");
        table.innerHTML = ""; // Clear the table before adding new rows

        exercises.forEach((exercise) => {
            const row = document.createElement("tr");

            // Make sure to include the data-id attribute for each edit button
            row.innerHTML = `
            <td>${exercise.name || "N/A"}</td>
            <td>${exercise.duration || "N/A"}</td>
            <td>${exercise.notes || "N/A"}</td>
            <td><button class="edit-btn" data-id="${exercise._id}">Edit</button></td>
            <td><button class="delete-btn" data-id="${exercise._id}">Delete</button></td>
        `;

            table.appendChild(row);
        });

        // Delete button click handler (event delegation)
        document.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.addEventListener("click", async (event) => {
                const id = btn.getAttribute("data-id");
                try {
                    await fetch(`/delete/${id}`, { method: "DELETE" });
                    await fetchExercises(); // Refresh the table after deletion
                } catch (error) {
                    console.error("Error deleting exercise:", error);
                }
            });
        });
    };

    fetchExercises(); // Initial fetch to populate table
});


document.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData); // Convert FormData to an object

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Send the form data as JSON
        });

        if (response.ok) {
            window.location.href = "/"; // Redirect to index if login is successful
        } else {
            const errorText = await response.text();
            alert(errorText); // Show the error message from server
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
});