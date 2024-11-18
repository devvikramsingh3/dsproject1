// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// // Enable CORS for all routes
// app.use(cors());

// let users = [];
// let messages = [];

// // Middleware to parse JSON and URL-encoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files (e.g., the frontend)
// app.use(express.static('frontend'));

// // Register user endpoint (POST method to handle registration)
// app.post('/register', (req, res) => {
//     const { username, password } = req.body;

//     // Check if username already exists
//     if (users.find(user => user.username === username)) {
//         return res.status(400).send('Username already exists!');
//     }

//     // Register the new user
//     users.push({ username, password });
//     res.send('User registered successfully!');
// });

// // Other routes...
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// In-memory storage for users and messages
let users = [];
let messages = [];

// Middleware to parse JSON and URL-encoded form data
app.use(cors());  // Allow cross-origin requests (if frontend is on a different port)
app.use(express.json());  // For parsing JSON bodies
app.use(express.urlencoded({ extended: true }));  // For parsing URL-encoded data (e.g., form submissions)

// Serve static files (for the frontend)
app.use(express.static('frontend'));

// POST request to register a new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).send('Username already exists!');
    }

    // Register the user
    users.push({ username, password });
    res.send('User registered successfully!');
});

// GET request to login a user
app.get('/login', (req, res) => {
    const { username, password } = req.query;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send('Login successful!');
    } else {
        res.status(400).send('Invalid username or password.');
    }
});

// GET request to send a message
app.get('/send-message', (req, res) => {
    const { sender, receiver, content } = req.query;

    // Save the message in memory
    messages.push({ sender, receiver, content });
    res.send('Message sent successfully!');
});

// GET request to fetch messages for a user
app.get('/messages', (req, res) => {
    const { receiver } = req.query;

    const userMessages = messages.filter(msg => msg.receiver === receiver);
    res.json(userMessages);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
