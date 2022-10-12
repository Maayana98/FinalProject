const {webCookieValidator, loginValidator} = require("../../middleware/authentication");
const router = require('express').Router();
const clientRouter = require("./client");
const Clients = require("../../database/models/clients");
const jsonwebtoken = require('jsonwebtoken');
const movies = require("./movies");
const orders = require("./orders");
const notificationsRouter = require("./notifications");


router.post('/login', loginCheck, async function (req, res) {
    try {
        const username = req.body.username
        let payload = {
            username: username
        }
        let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'})
        const updatedUser = await Users.findOneAndUpdate({username: username}, {sessionKey: token}, {})
        console.log(`Authenticated user login, username: ${username}`)
        res.cookie('authorization', token);
        res.send({auth: true, token: token, usesrId: updatedUser.userId})
    } catch (err) {
        console.log(`Error updating user session key: ${err}`)
        res.sendStatus(500)
    }
})

// About page route.
router.get('/logout', webCookieValidator, async function (req, res) {
    await Users.findOneAndUpdate({userId: res.userId}, {sessionKey: ''}, {})
    console.log(`Signed user out, userID:  ${res.userId}`)
    res.send();
})

// Nested route
router.use('/user', userRouter)

// Nested route
router.use('/reservations', reservationsRouter)

// Nested route
router.use('/hotels', hotelsRouter)

// Nested route
router.use('/notifications', notificationsRouter)


module.exports = router;