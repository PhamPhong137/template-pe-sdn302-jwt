const express = require("express");
const db = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const verifyToken = require("../middlewares/verifyToken");

const ApiRouter = express.Router();

//register
ApiRouter.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = await db.User.findOne({ email });
        if (user) {
            return res.status(400).send({ message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new db.User({
            email,
            password: hashedPassword,
            name
        });

        await newUser.save();
        res.status(201).send({
            message: "User created successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


ApiRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

ApiRouter.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId, role: req.role });
});




module.exports = ApiRouter;
