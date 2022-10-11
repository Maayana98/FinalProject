const router = require('express').Router()
const uuid4 = require("uuid4")


// Home page route.
const {CookieValidator} = require("../../middlewears/auth");
const Users = require("../../database/models/users");
const jwt = require("jsonwebtoken");

// Get user information
router.get('/', CookieValidator, async function (req, res) {
    try {
        const users = await Users.findOne({userId: res.userId}).exec()
        if (Object.keys(users).length > 0) {
            res.send(users)
        } else {
            console.log("No users found for GET request")
            res.send("No user or users were found");
        }
    } catch (e) {
        console.log(`[FAIL] error fetching users, ${e}`)
        res.sendStatus(500);
    }
})

// Delete user data
router.delete('/', CookieValidator, async function (req, res) {
    await Users.findOneAndDelete({userId: res.userId})
    console.log(`[SUCCESS] Successfully deleted user with ID: ${res.userId}`)
    res.send();
})

// New user
router.post('/', async function (req, res) {
    try {
        const userId = uuid4()
        const username = req.body.username
        const password = req.body.password
        let payload = {
            username: username
        }
        let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'})
        const newUser = new Users({userId: userId, username: username, password: password, sessionKey: token})
        await newUser.save(function (e) {
            if (e) {
                console.log(`[FAIL] error adding new user or user already exists: ${e}`)
                res.status(500).send("error adding new user or user already exists")
            } else {
                console.log(`[SUCCESS] Created new web user, ${newUser.username}`)
                res.cookie('authorization', token);
                res.send({
                    userId: userId,
                    token: token
                })
            }
        })
    } catch (e) {
        console.log(`[FAIL] Exception was thrown adding new user: ${e}`)
        res.sendStatus(403).send("forbidden")
    }
})

module.exports = router;