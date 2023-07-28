const jwt = require('jsonwebtoken')

const reqAuth = async (req, res, next) => {

    // verify
    const { authorization } = req.headers
    // Token required
    if(!authorization) {
        return res.status(401).json({error: 'Token required'})
    }
    // Split Token in "half"
    const token = authorization.split(' ')[1]
    
    try {
        // Verify Token adn get user id
        const {_id} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(_id + ' Authorization Succeeded') 
        next()
    } catch (error) {
        res.status(401).json({error: 'Not Authorized' })
    }

}

module.exports = reqAuth