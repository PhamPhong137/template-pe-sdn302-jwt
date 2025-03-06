const jwt = require('jsonwebtoken');
const httpErrors = require('http-errors');

const verifyToken = async (req, res, next) => {
    try {
        const receiveToken = req.headers["x-access-token"] || req.headers["authorization"]?.split(" ")[1];

        if (!receiveToken) {
            throw httpErrors.BadRequest("No token provide");
        }

        jwt.verify(receiveToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
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