require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/auth.js');
const userRouts = require('./routes/user.js');

const app = express(); 

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/user', userRouts);

// port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on post ${port}`);
});
