const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const Admin_Controller = require("./../Controllers/admins")

// /login
router.get("/", (req, res) => {

    const token = req.cookies.token;

    jwt.verify(token, "Dereje", (err, verified) => {
        if (err) {
            res.render("login")
            console.log("invalid jwt token...rendering to login page")
        } else {
            console.log("welcome")
            res.user = verified;
            res.redirect(303, "admin")
        }
    })
});

router.post("/", async (req, res) => {
    let username = await req.body.email;
    let password = await req.body.password;

    if (username === undefined && password === undefined) {
        res.render("login", {message: "please enter correct email and password"})
        return;
    }

    const admins = await Admin_Controller.getAdmins();

    if (admins === undefined){//if no data is found
        let message = "Problem with Mongodb Server.."
        res.status(401).render("login", {message})
        return;
    }

    let userFound = false;

    let realFirstname;
    let realLastname;
    let realPassword;
    let realUsername;
    let real_id;

    admins.forEach((value) => {
        if (username.toLowerCase() === value["username"].toLowerCase()
            && password.toLowerCase() === value["password"].toLowerCase()) {
            realFirstname = value["firstname"].toUpperCase();
            realLastname = value["lastname"].toUpperCase();
            realPassword = value["password"].toUpperCase();
            realUsername = value["username"].toUpperCase();
            real_id = value["_id"].toString().toUpperCase();
            userFound = true;
            return;
        }
        if (userFound) return;
    })

    if (userFound) {
        console.log("authorized user.......")
        const realUser = {
            realFirstname,
            realLastname,
            realPassword,
            realUsername,
            real_id
        }
        jwt.sign(realUser, "Dereje", (err, token) => {
            console.log("the token is : " + token)
            res.cookie("token", token);
            res.redirect(303, "admin")
        })
    } else {
        console.log("unauthorized user....")
        let message = "Email and Password is not correct retry!"
        res.status(401).render("login", {message})
        return;
    }
})

module.exports = router;