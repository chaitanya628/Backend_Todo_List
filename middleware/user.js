const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

module.exports = {
    validateUser: async (req, res, next) => {
        if (!req.headers.token) {
            res.status(401).send({ code: 401, message: "JWT token not provided" });
        }
        else {
            let userCheck = jwt.verify(req.headers.token, "testsecret");
            req.userId = userCheck.userId;
            const userResult = await userModel.findOne({ _id: req.userId });
            if (!userResult) {
                res.status(404).send({ code: 404, message: "User not found" });
            }
            else {
                if (userResult.status == "BLOCK") {
                    res.status(403).send({ code: 403, message: "This user is blocked. Please contact Admin" });
                }
                else if (userResult.status == "DELETE") {
                    res.status(405).send({ code: 405, message: "This user is deleted. Please contact Admin" });
                }
                else {
                    req.userId = userResult._id;
                    next();
                }
            }
        }
    }
}