function switchTab(tab) {
    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('register');

    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

document.getElementById('register-Form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('register-Email').value;
    const password = document.getElementById('register-Password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.email === email)) {
        alert('User already exists!');
        return;
    }

    users.push({ email, password, role: 'user' });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    switchTab('login');
});

document.getElementById('login-Form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login-Email').value;
    const password = document.getElementById('login-Password').value;

    if (email === 'admin@quiz.com' && password === 'admin123') {
        localStorage.setItem('loggedInUser', email);
        localStorage.setItem('userRole', 'admin');
        window.location.href = 'dashboard.html';
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', user.email);
        localStorage.setItem('userRole', user.role || 'user');
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});