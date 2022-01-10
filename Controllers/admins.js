const AdminsDB = require("../Databases/admins");

function addAdmin(admin) {
    return AdminsDB.addAdmin(admin);
}

function getAdmins () {
    return AdminsDB.allAdmins();
}

function updateAdmin(admin) {
    return AdminsDB.updateAdmin(admin)
}
function deleteAdmin(admin) {
    return AdminsDB.deleteAdmin(admin)
}

function getByFirstname (adminFirstname) {
    return AdminsDB.getByFirstname(adminFirstname);
}
function getByUsername (adminUsername) {
    return AdminsDB.getByUsername(adminUsername);
}
function searchAdmin(admin) {
    return AdminsDB.searchAdmin(admin);
}

module.exports.addAdmin = addAdmin;
module.exports.getAdmins = getAdmins;
module.exports.deleteAdmin = deleteAdmin
module.exports.updateAdmin = updateAdmin

module.exports.getByFirstname = getByFirstname
module.exports.getByUsername = getByUsername
module.exports.searchAdmin = searchAdmin;