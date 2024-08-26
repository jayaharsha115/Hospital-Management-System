
const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({
                message: 'Auth Failed: Missing or invalid token',
                success: false
            });
        }

        const token = authHeader.split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    message: 'Auth Failed: Invalid token',
                    success: false
                });
            } else {
                req.body.userId = decode.id;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: 'Auth Failed: Server error',
            success: false
        });
    }
};
