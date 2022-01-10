const express = require('express')
const cookiesParser = require("cookie-parser")
const router = express.Router();

router.get('',(req,res)=>{
    res.clearCookie("token");
    res.redirect(303,"login")
})

module.exports = router