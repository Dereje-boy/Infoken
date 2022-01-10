const MongoClient = require("mongodb").MongoClient
const dotenv = require("dotenv");

const url = dotenv.config().parsed["MONGODB_URL"];
const db_name = "Infoken";
const collection = 'Admins';

function addAdmin(admin) {
    return add(admin);
}

async function allAdmins() {
    return await all();
}

async function add(admin) {
    let database = await Mongo(url);
    let inserted = await database.collection(collection).insertOne({
        firstname: admin.firstname,
        lastname: admin.lastname,
        username: admin.username,
        password: admin.password,
        phoneNumber: admin.phoneNumber
    });
    return inserted
}

async function all() {
    let database = await Mongo(url);
    let cursor = database.collection(collection).find()

    let hasnext = await cursor.hasNext();
    let admins = [];

    while (hasnext) {
        let value = await cursor.next();
        admins.push(value)
        hasnext = await cursor.hasNext();
    }
    return admins;
}

async function Mongo(url) {
    let mongo = await MongoClient.connect(url);
    return await mongo.db(db_name);
}

async function updateAdmin(admin) {
    const database = await Mongo(url);

    const updateResult = await database.collection(collection).updateOne(
        {
            firstname: admin["firstname"],
            lastname: admin["lastname"],
            username: admin["username"],
            password: admin["password"]
        }, {
            $set: {
                firstname: admin["Newfirstname"],
                lastname: admin['Newlastname'],
                username: admin['Newusername'],
                password: admin['Newpassword'],
                phoneNumber: admin['NewphoneNumber']
            }
        }
    );
    return await updateResult;
}

async function deleteAdmin(admin){
    const db = await Mongo(url);
    const deleteResult = await db.collection(collection).deleteOne({
        firstname: admin["firstname"],
        lastname: admin['lastname'],
    });

    return deleteResult;

}

async function getByUsername(adminUsername) {
    let database = await Mongo(url);
    let cursor = database.collection(collection).find({
        username:adminUsername
    })

    let hasnext = await cursor.hasNext();
    let admins = [];

    while (hasnext) {
        let value = await cursor.next();
        admins.push(value)
        hasnext = await cursor.hasNext();
    }
    return admins;
}
async function getByFirstname(adminFirstname) {
    let database = await Mongo(url);
    let cursor = database.collection(collection).find({
        firstname:adminFirstname
    })

    let hasnext = await cursor.hasNext();
    let admins = [];

    while (hasnext) {
        let value = await cursor.next();
        admins.push(value)
        hasnext = await cursor.hasNext();
    }
    return admins;
}


async function searchAdmin(admin) {

    let mongo;
    try {
        mongo = await MongoClient.connect(url)
    } catch (e) {
        if (e.name.toString() === "MongoServerSelectionError")
            console.log("Server Selection Error")

        console.log("unable to retrieve admins \n" + e)
        return undefined;
    }

    const database = mongo.db(db_name);

    let cursor;

    switch (admin.search_by.toString().toLowerCase()) {
        case "firstname":
            cursor = database.collection(collection).find({
                firstname: {$regex:admin.search_by_value,$options:"i"},
            });
            break;
        case "lastname":
            cursor = database.collection(collection).find({
                lastname: {$regex:admin.search_by_value,$options:"i"},
            });
            break;
        case "username":
            cursor = database.collection(collection).find({
                username: {$regex:admin.search_by_value,$options:"i"},
            });
            break;
        case "password":
            cursor = database.collection(collection).find({
                password: {$regex:admin.search_by_value.toString(),$options:"i"},
            });
            break;
        default:
            cursor = database.collection(collection).find({
                firstname: {$regex:admin.search_by_value,$options:"i"},
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


module.exports.addAdmin = addAdmin;
module.exports.allAdmins = allAdmins;
module.exports.updateAdmin = updateAdmin
module.exports.deleteAdmin = deleteAdmin
module.exports.getByUsername = getByUsername
module.exports.getByFirstname = getByFirstname
module.exports.searchAdmin = searchAdmin