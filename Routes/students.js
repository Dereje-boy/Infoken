const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Students_Controller = require("../Controllers/students")


// /students
router.get("/", (req, res) => {
    let userEmail = res.user.realFirstname;
    res.send("welcome to students..\n" + userEmail)
})

router.get('/all', (req, res) => {
    // res.send("fetching all students")
    // Students_Controller.getStudents(val => {
    //     console.log(val)
    //     res.send(val);
    // })

    Students_Controller.getStudents().then(value => {
        // var json = JSON.parse(value.toString());
        if (value.length === 0)
            res.json("<h1>Student not found</h1>")
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
    res.render("newStudent",
        {
            admin_fullname: res.user.realFirstname + " " + res.user.realLastname,
            admin_username: res.user.realStudentsID
        }
    );
})

router.get("/added", (req, res) => {
    // res.redirect("/login");
    res.redirect("/students/new")
});
router.post("/getFirstname", async (req, res) => {
    let Firstname = req.body.Firstname;
    console.log(Firstname);
    let response = await Students_Controller.getByFirstname(Firstname);
    console.log(response);
    res.send(response);
});
router.post("/getStudentID", async (req, res) => {
    let studentID = req.body.studentID;
    let response = await Students_Controller.getByStudentID(studentID);
    console.log(response);
    res.send(response);
});

router.post("/added", async (req, res) => {

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let studentID = req.body.studentID;
    let department = req.body.department;
    let gender = req.body.gender;
    let dorm = req.body.dorm;
    let phoneNumber = req.body.phoneNumber;

    let registrarID = res.user.real_id;

    if (!(firstname && lastname &&
        studentID && department && gender && dorm)) {
        console.log("data is not fill out...")
        res.render("newstudent", {firstname: "please fill all the fields"})
        return
    }

    let isAdded = Students_Controller.AddStudents({
        firstname,
        lastname,
        studentID: studentID,
        department: department,
        gender: gender,
        dorm: dorm,
        phoneNumber: phoneNumber,
        registrarID,
        date: Date.now()
    })

    if (isAdded === true) {
        res.render("newStudent",
            {firstname: firstname + " " + lastname + " is added successfully"})
    } else {
        res.render("newStudent",
            {firstname: await isAdded})
    }
})

router.post("/delete", async (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let studentID = req.body.studentID;
    let department = req.body.department;
    let gender = req.body.gender;
    if (firstname !== undefined && lastname !== undefined && studentID !== undefined) {
        let deleteResult = await Students_Controller.deleteStudent(
            {
                firstname,
                lastname,
                studentID,
                department,
                gender
            })

        res.send(deleteResult)
    } else {
        res.json({
            acknowledged: false
        })
    }
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
        phoneNumber: req.body.phoneNumber,

        newFirstname: req.body.newFirstname,
        newLastname: req.body.newLastname,
        newStudentID: req.body.newStudentID,
        newDepartment: req.body.newDepartment,
        newGender: req.body.newGender,
        newDorm: req.body.newDorm,
        newPhoneNumber: req.body.newPhoneNumber,
    }

    // console.log(student);
    console.log("request body : \n" + req.body);

    for (let i in req.body) {
        console.log(i + ":\t" + req.body[i]);
    }

    let updateResult = await Students_Controller.updateStudent(student);
    console.log(updateResult)
    res.json(updateResult)

})


router.post("/search", async (req, res) => {

    let search = {
        search_by: req.body.search_by,
        search_by_value: req.body.search_by_value,
    }

    let result = await Students_Controller.searchStudent(search);

    res.json(result);

})

module.exports = router;