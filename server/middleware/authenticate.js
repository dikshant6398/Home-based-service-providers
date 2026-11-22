const jwt = require("jsonwebtoken");
const User = require('../models/user');
const Pro = require('../models/provider');

const authenticateUser = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "Authorization failed: No token provided" });
        }
        if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        const userExist = await User.findOne({ _id: verify._id, "tokens.token": token });
        if (!userExist) {
            return res.status(401).json({ error: "User not found" });
        }

        req.token = token;
        req.rootUser = userExist;
        req.userId = userExist._id;

        next();
    } catch (err) {
        console.log("Auth fail:", err.message);
        return res.status(401).json({ error: "Authentication failed" });
    }
};

const authenticatePro = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "Authorization failed: No token provided" });
        }
        if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        const userExist = await Pro.findOne({ _id: verify._id, "tokens.token": token });

        if (!userExist) {
            return res.status(401).json({ error: "Provider not found" });
        }

        req.token = token;
        req.rootUser = userExist;
        req.userId = userExist._id;

        next();
    } catch (err) {
        console.log("Auth fail:", err.message);
        return res.status(401).json({ error: "Authentication failed" });
    }
};

module.exports = { authenticateUser, authenticatePro };