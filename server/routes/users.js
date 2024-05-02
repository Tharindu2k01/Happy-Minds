var router = require('express').Router();
let User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post("/register", async (req, res) => {
    const user = req.body;

    const takenEmail = await User.findOne({email: user.email});

    if (takenEmail) {
        res.json({message: "Email has already been taken"})
    } else {
        user.password = await bcrypt.hash(req.body.password, 10)

        const dbUser = new User({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        })


        dbUser.save()
        res.json({message: "Success"})
    }
})

router.post("/login", (req, res) => {
    const userLoggingIn = req.body;

    User.findOne({email: userLoggingIn.email})
        .then(dbUser => {
            if (!dbUser) {
                return res.json({
                    message: "Invalid Email or Password" + userLoggingIn.email
                })
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = {
                            id: dbUser._id,
                            email: dbUser.email,
                        }
                        let token2 = jwt.sign(
                            payload,
                            "welcome@123",
                            {expiresIn: 86400},
                            (err, token) => {
                                if (err) {
                                    return res.json({
                                        message: "Error",
                                        error: err.toString()
                                    })
                                }
                                return res.json({
                                    message: "Success",
                                    token: "Bearer " + token
                                })
                            }
                        )

                    } else {
                        return res.json({
                            message: "Invalid Username or Password####"
                        })
                    }
                })
        })

})

function verifyJWT(req,res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, "welcome@123", (err, decoded) => {
            if(err) return res.json({
                isLoggedIn : false,
                message : "Failed to Authenticate"
            })

            req.user = {};
            req.user.id = decoded.ip
            req.user.email = decoded.email
            next()
        })
    }else {
        res.json({
            message: "Incorrect Token Given" ,
            isLoggedIn: false
        })
    }
}

router.get("/getUsername", verifyJWT, (req, res) => {
    res.json({
        isLoggedIn: true,
        email : req.user.email
    })
});

router.get("/isUserAuth", verifyJWT, (req, res) => {
    return res.json({
        isLoggedIn: true,
        email: req.user.email,
        role:req.user.role})
});



module.exports = router;
