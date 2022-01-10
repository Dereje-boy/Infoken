const express = require("express")
const handlebars = require("express-handlebars").create({defaultLayout: 'main'});
const body_parser = require("body-parser")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")

// routers...
const router = require("./Routes/router")
const login = require("./Routes/login")
const logout = require("./Routes/logout")
const admin = require("./Routes/admin")
const students = require("./Routes/students")
const books = require("./Routes/books")
const rents = require("./Routes/rents")

//middle wares...
const verifyToken = require("./Routes/verifyToken")

const app = express()

app.use(body_parser())
app.use(cookieParser())
app.engine('handlebars', handlebars.engine)
app.set('view engine', "handlebars")
app.use(express.static(__dirname + "/publics"))

app.use("/", router)
app.use("/login", login)
app.use("/logout", logout)
app.use("/admin", verifyToken.verifyStudents, admin)
app.use("/students", verifyToken.verifyStudents, students)
app.use("/books",verifyToken.verifyStudents, books)
app.use("/rents",verifyToken.verifyStudents, rents)

app.use((req, res, err) => {
    res.status(404)
    const path = req._parsedOriginalUrl && req._parsedOriginalUrl.path;
    if (path == "/imaged") {
        res.send("<h1>Your image is not found</h1>")
        return
    } else if (path === "/admin") {
        res.redirect("/login");
        return
    }
    res.send("<h1> Sorry, request not found.</h1>" +
        "<br><a href='/'>Go to Home</a>")
});

app.use((err, req, res, next) => {
    res.send("This is server error. <br>" +
        "We are working on it please be patient<br>" + err.message);
    console.error(err);
})

app.listen(dotenv.config().parsed['PORT'], () =>
    console.log("the server is listening on : "+dotenv.config().parsed['PORT']))
