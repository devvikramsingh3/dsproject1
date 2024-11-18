document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const messageForm = document.getElementById('messageForm');
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const chatSection = document.getElementById('chatSection');
    const loggedInStatus = document.getElementById('loggedInStatus');
    const messagesContainer = document.getElementById('messagesContainer');

    let loggedInUser = '';

    // Show Register Section
    document.getElementById('showRegisterBtn').addEventListener('click', function () {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    });

    // Show Login Section
    document.getElementById('showLoginBtn').addEventListener('click', function () {
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Handle Register Form submission
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        // Use POST request to send registration data to backend
        fetch('/register', {
            method: 'POST',  // Ensure POST request is used
            headers: {
                'Content-Type': 'application/json'  // Set content type to JSON
            },
            body: JSON.stringify({ username, password })  // Send data as JSON
        })
            .then(response => response.text())
            .then(data => {
                alert(data);  // Confirmation message
                if (data.includes('User registered successfully')) {
                    registerSection.style.display = 'none';
                    loginSection.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                alert('Error during registration');
            });
    });

    // Handle Login Form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        fetch(`/login?username=${username}&password=${password}`)
            .then(response => response.text())
            .then(data => {
                if (data.includes('Login successful')) {
                    loggedInUser = username;
                    loggedInStatus.textContent = `Logged in as: ${username}`;
                    loginSection.style.display = 'none';
                    chatSection.style.display = 'block';
                    fetchMessages();
                } else {
                    alert('Invalid credentials!');
                }
            })
            .catch(error => console.error('Error during login:', error));
    });

    // Handle Message Form submission
    messageForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const receiver = document.getElementById('receiver').value;
        const content = document.getElementById('messageContent').value;

        fetch(`/send-message?sender=${loggedInUser}&receiver=${receiver}&content=${content}`)
            .then(response => response.text())
            .then(data => {
                alert(data);  // Confirmation message
                document.getElementById('messageContent').value = '';  // Clear the message input
                fetchMessages();  // Reload messages
            })
            .catch(error => console.error('Error sending message:', error));
    });

    // Fetch and display messages for the logged-in user
    function fetchMessages() {
        fetch(`/messages?receiver=${loggedInUser}`)
            .then(response => response.json())
            .then(messages => {
                messagesContainer.innerHTML = '';
                if (messages.length === 0) {
                    messagesContainer.innerHTML = '<p>No messages</p>';
                } else {
                    messages.forEach(msg => {
                        const messageDiv = document.createElement('div');
                        messageDiv.textContent = `${msg.sender}: ${msg.content}`;
                        messagesContainer.appendChild(messageDiv);
                    });
                }
            })
            .catch(error => console.error('Error fetching messages:', error));
    }
});
