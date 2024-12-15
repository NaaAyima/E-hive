document.addEventListener("DOMContentLoaded", () => {
    // Select the form element and the submit button
    const form = document.querySelector("#event-form"); 
    const submitButton = document.querySelector("#submit-btn"); 

    // Add a click event listener to the submit button
    submitButton.addEventListener("click", async (e) => {
        e.preventDefault(); // Prevent the form's default submission behavior

        // Gather form inputs
        const eventData = {
            name: document.getElementById("event-name").value.trim(),
            date: document.getElementById("event-date").value,
            location: document.getElementById("event-location").value.trim(),
            description: document.getElementById("event-description").value.trim(),
            capacity: parseInt(document.getElementById("event-capacity").value, 10),
            availableSeats: parseInt(document.getElementById("event-capacity").value, 10), 
        };

        try {
            // Send POST request to the /events endpoint
            const response = await fetch("/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                const createdEvent = await response.json();
                alert(`Event "${createdEvent.name}" created successfully!`);
                form.reset(); // Clear the form after successful creation
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            
        }
    });
});
