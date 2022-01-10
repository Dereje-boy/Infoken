const StudentsDB = require("../Databases/students");

function AddStudent(student) {
    return StudentsDB.addStudent(student);
}

function getStudents () {
    return StudentsDB.getStudents();
}

function deleteStudent(studentInfo) {
    return StudentsDB.deleteStudents(studentInfo)
}
function updateStudent(studentInfo) {
    return StudentsDB.updateStudent(studentInfo)
}
function getByFirstname(studentFirstname) {
    return StudentsDB.getByFirstname(studentFirstname)
}
function getByStudentID(studentID) {
    return StudentsDB.getByStudentID(studentID)
}

function searchStudent(rent) {
    return StudentsDB.searchStudent(rent);
}

module.exports.AddStudents = AddStudent
module.exports.getStudents = getStudents;
module.exports.deleteStudent = deleteStudent
module.exports.updateStudent = updateStudent
module.exports.getByFirstname = getByFirstname
module.exports.getByStudentID = getByStudentID
module.exports.searchStudent = searchStudent;