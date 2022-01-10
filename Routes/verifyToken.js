const AdminController = require('../Controllers/admins')
const jwt = require("jsonwebtoken")

function verifyStudents2(req, res, next) {
    let BearerHeader = req.headers["authorization"];
    const token = req.cookies.token

    jwt.verify(token, "Dereje", (err, verified) => {
        console.log("you are verified...")
        req.user = verified;
        next();
    })

    if (typeof BearerHeader !== "undefined") {
        let bearer = BearerHeader.split(" ")
        let token = bearer[1];
        console.log(BearerHeader)
        jwt.verify(token, "Dereje", (err, verified) => {
            console.log("you are verified...")
            req.userEmail = verified;
        })
        next();
    } else {
        res.redirect(303,"login")
        console.log("you are not verified...")
        // next();
    }
}

async function verifyStudents(req, res, next) {
    const BearerHeader = await req.headers['authorization'];
    const tokenCookie = await req.cookies.token;

    let verifiedUser;

    // if bearer header is found
    if (BearerHeader !== undefined) {
        const Bearer = BearerHeader.split(' ');
        const TokenBearer = Bearer[1];

        jwt.verify(TokenBearer, "Dereje", (err, verified) => {
                if (err) {
                    console.log("verifyToken + TokenBearer : Invalid jwt token ")
                    res.redirect(303,"/login")
                    //if token cookie is found
                    jwt.verify(tokenCookie, "Dereje", (err, verified) => {
                        if (err){
                            console.log("verifyToken + TokenCookie : Invalid jwt token ")
                            res.redirect(303,"/login")
                            // res.render("login",{message:"please log in first."})
                        }else{
                            console.log("verifyToken + TokenCookie : working jwt token ")
                            verifiedUser = verified
                            res.user = verifiedUser;
                            next();
                        }
                    })
                } else {
                    console.log("verifyToken + TokenBearer : working jwt token ")
                    verifiedUser = verified
                    res.user = verifiedUser;
                    next();
                }
            }
        )
    } else { //if bearer header is not found checking with cookie...
        //if token cookie is found
        jwt.verify(tokenCookie, "Dereje", async (err, verified) => {
            if (err){
                console.log("verifyToken + TokenCookie : Invalid jwt token ")
                res.redirect(303,"/login")
                // res.render("login",{message:"please log in first."})
            }else{
                // console.log("verifyToken + TokenCookie : working jwt token ")
                console.log(verified);
                let admins = await AdminController.searchAdmin({
                    search_by:"username",
                    search_by_value:verified.realUsername,
                })

                verifiedUser = verified
                // console.log("verified user : " + verifiedUser.realFirstname)
                res.user = verifiedUser;
                next();
                return

                if (admins.length>0){
                    verifiedUser = verified
                    // console.log("verified user : " + verifiedUser.realFirstname)
                    res.user = verifiedUser;
                    next();
                }else{
                    console.log("verifyToken + TokenCookie : Invalid jwt token ")
                    res.redirect(303,"/login")
                }
            }
        })
    }
}

module.exports.verifyStudents = verifyStudents;