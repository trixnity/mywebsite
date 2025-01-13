// Ensure dropdown works on hover
const dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('mouseenter', () => {
    dropdown.querySelector('.dropdown-content').style.display = 'block';
});
dropdown.addEventListener('mouseleave', () => {
    dropdown.querySelector('.dropdown-content').style.display = 'none';
});

// Role-based visibility for rating field in registration
const roleInputs = document.querySelectorAll('input[name="role"]');
const ratingContainer = document.getElementById('rating-container');

roleInputs.forEach(input => {
    input.addEventListener('change', function () {
        if (this.value === 'coach') {
            ratingContainer.style.display = 'block';
        } else {
            ratingContainer.style.display = 'none';
        }
    });
});

// Registration form validation
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const role = document.querySelector('input[name="role"]:checked').value;
    const fullName = document.getElementById('fullname').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const rating = role === 'coach' ? document.getElementById('rating').value.trim() : null;

    // Validate inputs
    if (!fullName || !username || !email || !password || (role === 'coach' && (rating === null || rating === ''))) {
        alert('Please fill out all fields.');
        return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Password must contain at least 8 characters, including letters and numbers.');
        return;
    }

    // Validate rating range for coaches
    if (role === 'coach' && (rating < 0 || rating > 4000)) {
        alert('Online Rating must be between 0 and 4000.');
        return;
    }

    // Simulate successful registration
    alert('Registration successful!');
    window.location.href = 'login.html';
});

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        const role = document.querySelector('input[name="role"]:checked').value;
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Dummy credentials for testing
        const users = [
            { username: "student1", password: "password123", role: "student" },
            { username: "coach1", password: "password456", role: "coach" }
        ];

        const user = users.find(u => u.username === username && u.password === password && u.role === role);

        if (user) {
            // Dynamically set the action attribute
            if (role === "student") {
                loginForm.action = "student-dashboard.html";
            } else if (role === "coach") {
                loginForm.action = "coach-dashboard.html";
            }
            loginForm.submit(); // Submit the form to the updated action
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
});




// Search functionality
document.getElementById('search-button').addEventListener('click', function () {
    const query = document.getElementById('search-input').value.toLowerCase();

    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    const pages = [
        { name: 'Achievements', url: 'achievements.html', content: 'Explore the achievements of our players, showcasing their skills and dedication.' },
        { name: 'Classes', url: 'classes.html', content: 'Join our chess classes designed for players of all levels, guided by professional coaches.' },
        { name: 'Coaches', url: 'coaches.html', content: 'Meet our experienced coaches who will help you improve your chess strategies and skills.' },
        { name: 'Login', url: 'login.html', content: 'Login to access your account and explore more features.' },
        { name: 'Register', url: 'register.html', content: 'Register to become a part of our chess community and enjoy all the benefits.' }
    ];

    const results = pages.filter(page => 
        page.name.toLowerCase().includes(query) || 
        page.content.toLowerCase().includes(query)
    );

    if (results.length > 0) {
        alert(`Found match: ${results[0].name}`);
        window.location.href = results[0].url;
    } else {
        alert('No results found.');
    }
});
