const jwt = require('jsonwebtoken');
const httpErrors = require('http-errors');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) return res.status(403).json({
            message: "No token provided!",
            status: 403
        });

        const bearer = token.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                    status: 401
                });
            }
            req.userId = decoded.userId;
            req.role = decoded.role;
            
            next();
        })
    } catch (error) {
        next(httpErrors.Unauthorized());
    }
};

module.exports = verifyToken;