const Clients = require("../database/models/Clients");
const jsonWebToken = require("jsonwebtoken");


const CookieValidator = async (req, res, next) => {
    try {
        let token = req.cookies.authorization
        if (token == null) return res.sendStatus(401);
        jsonWebToken.verify(token, process.env.jsonWebToken_SECRET.toString(), {}, (e) => {
            if (e) {
                console.log(`[FAIL] Token e , ${e.message}`)
                return res.sendStatus(403);
            }
            Clients.findOne({sessionKey: req.cookies.authorization}, function (e, client) {
                if (e) {
                    console.log(`[FAIL] error finding user in database, ${e}`)
                    res.sendStatus(401)
                } else {
                    if (client) {
                        res.auth = true
                        res.clientId = client.clientId
                        next();
                    } else {
                        console.log(`[FAIL] Found no client with the token: ${token}`)
                        res.sendStatus(401)
                    }
                }
            })
        });
    } catch (e) {
        console.log(`[FAIL] error User authenticate, ${e}`)
        res.sendStatus(401)
    }
};


const loginCheck = async (req, res, next) => {
    try {
        let password = req.body.password;
        let clientname = req.body.clientname;
        if (password && clientname) {
            const client = await Clients.findOne({clientname: clientname, password: password}).exec()
            if (client !== null) {
                console.log(`[SUCCESS] Authentication login credentials for user: ${clientname}`)
                next();
            } else {
                console.log(`[FAIL] No user found`)
                res.status(401).json("No user found")
            }
        } else {
            console.log(`[FAIL] No legitimate login data was given for login`)
            res.sendStatus(401)
        }
    } catch (e) {
        console.log(`[FAIL] error parsing login request for authentication reason ${e}`);
        res.sendStatus(400)
    }
}


module.exports = {CookieValidator, loginCheck}