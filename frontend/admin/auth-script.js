const API_URL = 'https://your-backend-url.onrender.com/api';

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
      showLoginError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        console.log('Login successful, saving token and user data');
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('userName', data.name || email.split('@')[0]);
        localStorage.setItem('userEmail', data.email || email);
        
        console.log('User data saved. Name:', localStorage.getItem('userName'));
        console.log('Redirecting to index.html');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 500);
      } else {
        showLoginError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      showLoginError('Connection error. Please try again.');
    }
  });
}

// Signup form handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if (!name || !email || !password) {
      showSignupError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      showSignupError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      console.log('Signup response:', data);

      if (response.ok) {
        alert('Registration successful! Please login with your credentials.');
        window.location.href = 'login.html';
      } else {
        showSignupError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      showSignupError('Connection error. Please try again.');
    }
  });
}

function showLoginError(message) {
  const errorDiv = document.getElementById('login-error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    setTimeout(() => errorDiv.classList.remove('show'), 5000);
  }
}

function showSignupError(message) {
  const errorDiv = document.getElementById('signup-error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    setTimeout(() => errorDiv.classList.remove('show'), 5000);
  }
}
