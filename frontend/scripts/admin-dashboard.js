document.addEventListener("DOMContentLoaded", async () => {
    // Define API endpoints
    const EVENTS_API = "/events";
    const USERS_API = "/users";

    try {
        // Fetch events data
        const eventsResponse = await fetch(EVENTS_API);
        if (!eventsResponse.ok) {
            throw new Error(`Failed to fetch events: ${eventsResponse.status}`);
        }
        const events = await eventsResponse.json();

        // Fetch users data
        const usersResponse = await fetch(USERS_API);
        if (!usersResponse.ok) {
            throw new Error(`Failed to fetch users: ${usersResponse.status}`);
        }
        const users = await usersResponse.json();

        // Populate Total Events and Upcoming Events
        const totalEvents = events.length;
        document.querySelector(".stat-card:nth-child(1) p").textContent = totalEvents;
        document.querySelector(".stat-card:nth-child(3) p").textContent = totalEvents; // Upcoming Events

        // Populate Total Users
        const totalUsers = users.length;
        document.querySelector(".stat-card:nth-child(2) p").textContent = totalUsers;

        // Populate Active Registrations (userType = USER)
        const activeUsers = users.filter(user => user.userType === "USER").length;
        document.querySelector(".stat-card:nth-child(4) p").textContent = activeUsers;

        // Populate Recent Activities Table
        const tableBody = document.querySelector("table tbody");
        tableBody.innerHTML = ""; // Clear existing rows
        events.forEach(event => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${event.name}</td>
                <td>${event.rsvps.length || 0}</td>
                <td>${new Date(event.date).toLocaleDateString()}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error populating dashboard:", error);
        alert("Failed to load dashboard data. Please try again later.");
    }
});
