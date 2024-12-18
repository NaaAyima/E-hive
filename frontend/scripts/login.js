async function handleLogin(event) {
    event.preventDefault();

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("Login Request Data:", { email, password }); //

    try {
        // Make the API request to login the user
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

       
        if (response.ok) {
            console.log(response);
            const data = await response.json();
            
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            
            // Redirect user based on role
            if (data.user.userType === 'admin') {
                window.location.href = '../admin/dashboard.html'; // Redirect to admin dashboard
            } else {
                window.location.href = '../user/dashboard.html'; // Redirect to user dashboard
            }
        } else {
            const errorMessage = await response.text();
            const messageDiv = document.getElementById('login-message');
            messageDiv.innerHTML = `<p>${errorMessage}</p>`;
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        const messageDiv = document.getElementById('login-message');
        messageDiv.innerHTML = `<p>An error occurred. Please try again later.</p>`;
        messageDiv.style.color = 'red';
    }
}


document.getElementById('login-btn').addEventListener('click', handleLogin);
