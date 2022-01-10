const mongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");

const Rents_Controller = require("../Controllers/rents");

const url = dotenv.config().parsed["MONGODB_URL"];
const db_name = "Infoken";
const collection = 'Students';

async function addStudent(student) {

    let studentExist = await StudentExist(student);
    if (studentExist.length > 0 ){
        return "Student already exist with student ID : " + studentExist[0].studentID
    }

    mongoClient.connect(url, (error, db) => {
        if (error) {
            console.log("unable to connect to the database.")
            throw new Error("unable to connect.")
        }
        let database = db.db(db_name)
        database.collection(collection).insertOne({
            firstname: student.firstname,
            lastname: student.lastname,
            studentID: student.studentID,
            department: student.department,
            gender: student.gender,
            dorm: student.dorm,
            phoneNumber: student.phoneNumber,
            registrarID: student.registrarID,
            Date: student.date
        }, (error, result) => {
            if (error) {
                console.log("unable to add " + student.firstname + " " + student.lastname);
                throw new Error("student not added")
            }
            console.log("the student is added : " + student.firstname + " " + student.lastname);
            return true;
        });
    })
}

async function getStudents() {
    let mongo;
    try {
        mongo = await mongoClient.connect(url);
    } catch (e) {
        if (e.name.toString() === "MongoServerSelectionError") {
            console.log("Server Selection Error")
        }
        console.log("unable to retrieve students \n" + e.name)
        return undefined;
    }
    const database = mongo.db(db_name);
    const cursor = database.collection(collection).find();

    let hasnext = await cursor.hasNext();

    let values = []

    while (hasnext) {
        let value = await cursor.next();
        values.push(value)
        hasnext = await cursor.hasNext();
    }

    return new Promise((resolve, reject) => {
        resolve(values)
    })
}

async function deleteStudent(student) {
    let mongo = await mongoClient.connect(url)
    let db = await mongo.db(db_name)

    const isStudentExist = await Rents_Controller.CheckExist({});

    if (isStudentExist < 1)
        return await db.collection(collection).deleteOne(
            {
                firstname: student.firstname,
                lastname: student.lastname,
                studentID: student.studentID
            }
        );
    else{
        return {
            acknowledged :false,
            reason:"The student rented a book",
            recommendation:"The student must return the book first"
        }
    }

}

async function updateStudent(student) {
    const mongo = await mongoClient.connect(url);
    const db = await mongo.db(db_name);
    const updateResult = await db.collection(collection).updateOne(
        {
            firstname: student.firstname,
            lastname: student.lastname,
            studentID: student.studentID,
        }, {
            $set: {
                firstname: student.newFirstname,
                lastname: student.newLastname,
                studentID: student.newStudentID,
                department: student.newDepartment,
                gender: student.newGender,
                dorm: student.newDorm,
                phoneNumber: student.newPhoneNumber,
            }
        })
    return updateResult;
}

async function getByFirstname(studentFirstname) {
    let mongo;
    try {
        mongo = await mongoClient.connect(url);
    } catch (e) {
        if (e.name.toString() === "MongoServerSelectionError") {
            console.log("Server Selection Error")
        }
        console.log("unable to retrieve students \n" + e.name)
        return undefined;
    }
    const database = mongo.db(db_name);
    const cursor = database.collection(collection).find({
        firstname: studentFirstname
    });

    let hasnext = await cursor.hasNext();

    let values = []

    while (hasnext) {
        let value = await cursor.next();
        values.push(value)
        hasnext = await cursor.hasNext();
    }

    return new Promise((resolve, reject) => {
        resolve(values)
    })
}

async function getByStudentID(studentID) {
    let mongo;
    try {
        mongo = await mongoClient.connect(url);
    } catch (e) {
        if (e.name.toString() === "MongoServerSelectionError") {
            console.log("Server Selection Error")
        }
        console.log("unable to retrieve students \n" + e.name)
        return undefined;
    }
    const database = mongo.db(db_name);
    const cursor = database.collection(collection).find({
        studentID: studentID
    });

    let hasnext = await cursor.hasNext();

    let values = []

    while (hasnext) {
        let value = await cursor.next();
        values.push(value)
        hasnext = await cursor.hasNext();
    }

    return new Promise((resolve, reject) => {
        resolve(values)
    })
}

async function searchStudent(student) {

    let mongo;
    try {
        mongo = await mongoClient.connect(url)
    } catch (e) {
        if (e.name.toString() === "MongoServerSelectionError")
            console.log("Server Selection Error")

        console.log("unable to retrieve rents \n" + e.name)
        return undefined;
    }

    const database = mongo.db(db_name);

    let cursor;

    switch (student.search_by.toString().toLowerCase()) {
        case "firstname":
            cursor = database.collection(collection).find({
                firstname: {$regex:student.search_by_value,$options:"i"}
            });
            break;
        case "lastname":
            cursor = database.collection(collection).find({
                lastname: {$regex:student.search_by_value,$options:"i"}
            });
            break;
        case "department":
            cursor = database.collection(collection).find({
                department: {$regex:student.search_by_value,$options:"i"}
            });
            break;
        case "student id":
            cursor = database.collection(collection).find({
                studentID: {$regex:student.search_by_value,$options:"i"}
            });
            break;
        default:
            cursor = database.collection(collection).find({
                firstname: {$regex:student.search_by_value,$options:"i"}
            });
    }

    let hasNext = await cursor.hasNext();

    let values = []

    while (hasNext) {
        let value = await cursor.next();
        values.push(value)
        hasNext = await cursor.hasNext();
    }

    return new Promise((resolve, reject) => {
        resolve(values)
    })
}

async function StudentExist(student) {

    let mongo;
    try {
        mongo = await mongoClient.connect(url)
    } catch (e) {
        if (e.name.toString() === "MongoServerSelectionError")
            console.log("Server Selection Error")

        console.log("unable to retrieve rents \n" + e.name)
        return undefined;
    }

    const database = mongo.db(db_name);

    let cursor = database.collection(collection).find({
        studentID: student.studentID
    });

    let hasNext = await cursor.hasNext();

    let values = []

    while (hasNext) {
        let value = await cursor.next();
        values.push(value)
        hasNext = await cursor.hasNext();
    }

    return new Promise((resolve, reject) => {
        resolve(values)
    })
}

module.exports.addStudent = addStudent
module.exports.getStudents = getStudents
module.exports.deleteStudents = deleteStudent
module.exports.updateStudent = updateStudent
module.exports.getByFirstname = getByFirstname
module.exports.getByStudentID = getByStudentID
module.exports.searchStudent = searchStudent
module.exports.StudentExist = StudentExist