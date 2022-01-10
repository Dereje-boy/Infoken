const RentsDB = require("../Databases/rents");

function AddRent(rent) {
    return RentsDB.addRent(rent);
}

function getRents() {
    return RentsDB.getRents();
}

function deleteRent(rent) {
    return RentsDB.deleteRent(rent);
}

function getRent(rent) {
    return RentsDB.getRent(rent);
}

function searchRent(rent) {
    return RentsDB.searchRent(rent);
}

function CheckExist(rent) {
    return RentsDB.CheckExist(rent);
}

module.exports.addRent = AddRent;
module.exports.getRents = getRents;
module.exports.getRent = getRent;
module.exports.deleteRent = deleteRent;
module.exports.searchRent = searchRent;
module.exports.CheckExist = CheckExist;