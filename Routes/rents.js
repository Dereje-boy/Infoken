const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Rents_Controller = require("../Controllers/rents")


// /rents
router.get("/", async (req, res) => {
    let rent = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        title: req.body.title,
        date: req.body.date,
    }
    console.log(rent);
    let oneRent = Rents_Controller.getRent(rent)
    res.json(oneRent);
})

router.post("/get", async (req, res) => {
    let rent = {
        studentID: req.body.studentID,
        search_by_studentID: req.body.search_by_studentID
    }

    let oneRent = await Rents_Controller.getRent(rent)

    console.log("finding the rent");

    res.json(oneRent)

})

router.post("/search",async (req,res)=>{

    let search = {
        search_by : req.body.search_by,
        search_by_value : req.body.search_by_value,
    }

    let result = await Rents_Controller.searchRent(search);

    res.json(result);

})


router.get('/all', (req, res) => {
    Rents_Controller.getRents().then(value => {
        // var json = JSON.parse(value.toString());
        if (value.length == 0)
            res.json("<h1>Rent not found</h1>")
        else res.json(value)
    })
})

router.get("/allJSON", async (req, res) => {

    let allStudents = await Students_Controller.getStudents();

    // return allStudents;

    let json = {name: "giegjie"};

    let myjson = {
        "name": "Dere Boy",
        "age": 90,
        "sex": "Female"
    }

    res.json(allStudents);

})

router.get('/new', (req, res) => {
    res.render("newRent",
        {
            admin_username: res.user.realStudentsID,
            admin_fullname: res.user.realFirstname + " " + res.user.realLastname,
        }
    );

})

router.get("/added", (req, res) => {
    // res.redirect("/login");
    res.redirect("/students/new")
});

router.post("/added", async (req, res) => {

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let studentID = req.body.studentID;
    let department = req.body.department;
    let dorm = req.body.dorm;
    let phoneNumber = req.body.phoneNumber;

    let title = req.body.title
    let category = req.body.category
    let author = req.body.author

    let registrarID = res.user.real_id;

    if (!(firstname && lastname &&
        studentID && department && dorm && title && author)) {
        console.log("data is not fill out...")
        res.render("newRent", {firstname: "please fill all the fields"})
        return
    }

    let result = Rents_Controller.addRent({
        firstname,
        lastname,
        studentID,
        department,
        dorm,
        phoneNumber,
        registrarID,
        title, category, author, date: Date.now()
    })

    result.then(value=>{
        console.log("this is rent route....");
        console.log(value);
        res.json(value)
    }).catch(err=>{
        let SendJson = {
            isSuccessfull:false,
            reason:"The promise catch is running",
            recommendation:"Try re-renting the book or contact the developer"
        }
        console.log(value);
        res.json(SendJson)
    })

})

router.post("/delete", async (req, res) => {
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let studentID = req.body.studentID
    let department = req.body.department
    let title = req.body.title
    let author = req.body.author
    let date = parseInt(req.body.date)

    let rent = {
        firstname, lastname, studentID, department,
        title, author, date
    }

    console.log(rent);

    let updateResult = Rents_Controller.deleteRent(rent)

    updateResult.then(value => {
        console.log(value);
        res.send(value)
    }).catch(reason => {
        res.send(reason)
    })
})

router.post("/update", async (req, res) => {
    console.log("updating the student")
    const student = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        studentID: req.body.studentID,
        department: req.body.department,
        gender: req.body.gender,
        dorm: req.body.dorm,

        newFirstname: req.body.newFirstname,
        newLastname: req.body.newLastname,
        newStudentID: req.body.newStudentID,
        newDepartment: req.body.newDepartment,
        newGender: req.body.newGender,
        newDorm: req.body.newDorm,
    }

    console.log(student);

    let updateResult = await Students_Controller.updateStudent(student);
    console.log(updateResult)
    res.json(updateResult)

})

module.exports = router;