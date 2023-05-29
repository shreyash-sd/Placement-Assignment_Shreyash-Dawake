const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Replace this with your own secret key
const SECRET_KEY = 'your-secret-key';

// Sample in-memory user data (Replace with a database in a real application)
const users = [];

// Signup controller
const signup = (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    // Create a new user object
    const newUser = {
      id: Date.now(),
      username,
      password: hashedPassword,
    };

    // Save the user
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  });
};

// Login controller
const login = (req, res) => {
  const { username, password } = req.body;

  // Find the user with the provided username
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Check the password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create a JWT token
    const token = jwt.sign({ username: user.username }, SECRET_KEY);

    res.status(200).json({ token });
  });
};

// Protected route controller
const protectedRoute = (req, res) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    const username = decoded.username;

    // Find the user with the provided username
    const user = users.find((user) => user.username === username);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Authorized access
    res.status(200).json({ message: 'Protected route accessed successfully' });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { signup, login, protectedRoute };
