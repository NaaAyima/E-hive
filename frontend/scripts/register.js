// Register form submission handler
document.querySelector('.auth-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form default submission
  
    // Collect form data
    const userType = document.querySelector('#user-type').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const preferences = Array.from(document.querySelectorAll('input[name="preferences"]:checked')).map(checkbox => checkbox.value);
  
    // Construct the payload
    const userData = {
      userType,
      email,
      password,
      preferences,
    };
  
    try {
      // Send a POST request to the /users route
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      // Check if the registration was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register user');
      }
  
      // Get the user object from the response
      const user = await response.json();
  
      // Store user object in localStorage
      localStorage.setItem('user', JSON.stringify(user));
  
      // Redirect user based on their role
      if (user.userType === 'admin') {
        window.location.href = '../admin/dashboard.html';
      } else {
        window.location.href = '../user/dashboard.html';
      }
    } catch (error) {
      // Handle errors (display to user or log for debugging)
      console.error('Registration error:', error.message);
      alert('Error: ' + error.message);
    }
  });
  