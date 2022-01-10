const mongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");

const url = dotenv.config().parsed["MONGODB_URL"];
const db_name = "Infoken";
const collection = 'Rents';

async function addRent(rent) {

    let isExist = await CheckExist(rent);
    console.log(isExist.length);
    if (isExist.length > 0){
        return {
            isSuccessfull: false,
            reason:"The student already rented other book",
            recommendation:"The student must return the book before renting other."
        }
    }

    let db = await mongoClient.connect(url);

    let database = db.db(db_name)
    let inserted = await database.collection(collection).insertOne({
        firstname: rent.firstname,
        lastname: rent.lastname,
        studentID: rent.studentID,
        department: rent.department,
        dorm: rent.dorm,
        phoneNumber: rent.phoneNumber,
        registrarID: rent.registrarID,
        title: rent.title,
        category: rent.category,
        author: rent.author,
        returned: false,
        date: rent.date,
    })

    console.log("this is from database rent....");
    console.log(inserted);
    if (inserted.acknowledged === true){
        //if successfully rented
        return {
            isSuccessfull: true,
            reason:"",
            recommendation: "You can give the book to the student."
        }
    }else
        //if not rented due to mongo server
        return {
            isSuccessfull: false,
            reason:"mongo server error raised",
            recommendation: "Don't give the book to the student !!!"
        }
}

async function getRents() {
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
    const cursor = database.collection(collection).find({
        "returned": false
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

async function getRent(rent) {
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

    let search = {
        studentID: rent.studentID,
        search_by_studentID: rent.search_by_studentID
    }

    let cursor;

    if (search.search_by_studentID)
        cursor = database.collection(collection).find({
            studentID: search.studentID,
            returned: false
        });
    else
        cursor = database.collection(collection).find({
            title: search.studentID,
            returned: false
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

async function deleteRent(rent) {

    let mongo = await mongoClient.connect(url)
    let db = await mongo.db(db_name)
    let deleteResult = await db.collection(collection).updateOne(
        {
            firstname: rent.firstname,
            lastname: rent.lastname,
            studentID: rent.studentID,
            department: rent.department,
            title: rent.title,
            author: rent.author,
            date: rent.date
        }, {
            $set: {
                returned: true,
                dateReturned: Date.now()
            }
        }
    )

    console.log("from rent db delete function");
    console.log(rent);

    return deleteResult;
}

async function searchRent(rent) {

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

    console.log("searching for books " + rent);

    switch (rent.search_by.toString().toLowerCase()) {
        case "firstname":
            cursor = database.collection(collection).find({
                firstname: {$regex:rent.search_by_value,$options:"i"},
                returned: false
            });
            break;
        case "lastname":
            cursor = database.collection(collection).find({
                lastname: {$regex:rent.search_by_value,$options:"i"},
                returned: false
            });
            break;
        case "student id":
            cursor = database.collection(collection).find({
                studentID: {$regex:rent.search_by_value,$options:"i"},
                returned: false
            });
            break;
        case "book title":
            cursor = database.collection(collection).find({
                title: {$regex:rent.search_by_value,$options:"i"},
                returned: false
            });
            break;
        default:
            cursor = database.collection(collection).find({
                firstname: {$regex:rent.search_by_value,$options:"i"},
                returned: false
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

async function CheckExist(rent) {

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
        firstname: rent.firstname,
        lastname: rent.lastname,
        studentID: rent.studentID,
        returned: false
    })

    let hasNext = await cursor.hasNext();

    let values = []

    while (hasNext) {
        let value = await cursor.next();
        values.push(value)
        hasNext = await cursor.hasNext();
    }

    return values;
}

module.exports.addRent = addRent
module.exports.getRents = getRents
module.exports.getRent = getRent
module.exports.deleteRent = deleteRent
module.exports.searchRent = searchRent
module.exports.CheckExist = CheckExist