const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

module.exports = {
    register: async (req, res) => {
        const { firstname, lastname, email, mobilenumber, username, password } = req.body;
        let userCheck = await userModel.findOne({ username: username, status: "ACTIVE" });
        if (userCheck) {
            res.status(409).send({ code: 409, message: "This username already exists" });
        }
        else {
            let userCreate = await userModel.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                mobilenumber: mobilenumber,
                username: username,
                password: bcrypt.hashSync(password)
            })
            res.status(200).send({ code: 200, message: "User created successfully", result: userCreate });
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        let userResult = await userModel.findOne({ username: username, status: "ACTIVE" });
        if (!userResult) {
            res.status(404).send({ code: 404, message: "User not found" });
        }
        else {
            let passwordCheck = bcrypt.compareSync(password, userResult.password);
            if (!passwordCheck) {
                res.status(401).send({ code: 401, message: "Invalid credentials" });
            }
            else {
                const token = jwt.sign({ userId: userResult._id, username: userResult.username }, "testsecret", { expiresIn: '24h' });
                let result = {
                    userId: userResult._id,
                    username: userResult.username,
                    token: token
                }
                res.status(200).send({ code: 200, message: "Logged-In successfully", result });
            }
        }
    },

    profile: async (req, res) => {
        console.log("userId", req.userId);
        let userResult = await userModel.findOne({ _id: req.userId, status: "ACTIVE" }).select('-password');
        if (!userResult) {
            res.status(404).send({ code: 404, message: "User not found" });
        }
        else {
            res.status(200).send({ code: 200, message: "User details fetched successfully", result: userResult });
        }
    }
}