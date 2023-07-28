const nedb = require("nedb-promise");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// Create DB
const accountDB = new nedb({ filename: "./database/users.db", autoload: true });

// Create JWT Token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3d"
    })
}

const signup = async (req, res) => {
    // Get data from frontend
    const clientData = req.body;
    
    try {
        // Search for user in database
        const existUser = await accountDB.findOne({
            email: clientData.email
        })
        // User found in database
        if (existUser) {
            res.status(400).json({error: 'Email already in use'})
        } else {
            // Create user in database
                const hashPass = await bcrypt.hash(clientData.password, 10)
                clientData.password = hashPass
                accountDB.insert(clientData)
                const token = createToken(clientData.email)     
                res.status(200).json({email: clientData.email, role: clientData.role,  token: token})
            }
    } catch (error) {
        console.log(error)
        res.status(400).json({error: 'Somting went wrong, try again'})
    }
}


const signin = async (req, res) => {
    const clientData = req.body;
    // Find user
    const userEmail = await accountDB.findOne({
        email: clientData.email
    })
    try {
        if (!userEmail) {
            // User not found
            return res.status(400).json({error: 'Email not found'})
        }
        const passwordMatch = await bcrypt.compare(clientData.password, userEmail.password)
            // User found
        if (userEmail && passwordMatch) {
            const token = createToken(userEmail.email)
            res.status(201).json({email: userEmail.email, role: userEmail.role,  token });
        } 
        else {
            return res.status(400).json({ error: 'Wrong email or password' })
        } 
    } catch (error) {
        console.log('LOGIN ERROR', error)
    }

}

module.exports = { signup, signin }


