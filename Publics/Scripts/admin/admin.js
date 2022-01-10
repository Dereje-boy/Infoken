let whichTable = "student";

console.log("admin is loaded successfully")
document.querySelector("title").innerHTML = 'Admin Dashboard'
const table = document.querySelector(".table");

let student = {}, book = {}, admin = {}, rent = {};
let clickedRow;
console.log(table.parentElement)
const AdminContainer = document.querySelector(".Admin-container");

const studentsButton = document.querySelector(".students-button");
const booksButton = document.querySelector(".books-button");
const rentsButton = document.querySelector(".rents-button");
const adminsButton = document.querySelector(".admins-button");
const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search_button");
const returnButton = document.querySelector(".return-button");
const refreshButton = document.querySelector(".refresh-button");
const editModeButton = document.querySelector(".edit-mode-button");
const deleteButton = document.querySelector(".delete-student-button");
const updateButton = document.querySelector(".update-student-button");

const SelectSearchBy = document.querySelector(".Select-Search-By")

const firstname = document.querySelector(".firstname input[type=text]")
const lastname = document.querySelector(".lastname input[type=text]")
const studentID = document.querySelector(".studentID input[type=text]")
const department = document.querySelector(".department input[type=text]")
const gender = document.querySelector(".gender input[type=text]")
const dorm = document.querySelector(".dorm input[type=text]")
const phoneNumber = document.querySelector(".phoneNumber input[type=tel]")

table.addEventListener('click', tableEventListener)
const databases = document.querySelector(".databases");
const databasesContainer = document.querySelector(".databases-container");

AdminContainer.addEventListener('click', (e) => {
    if (e.target !== databases && e.target !== databasesContainer)
    if (databasesContainer.style.display.toLowerCase() !== "none"){
        databasesContainer.style.display = "none";
        databases.innerHTML = "Show Databases";
    }
})

databases.addEventListener('click', () => {
    if (databasesContainer.style.display.toLowerCase() === "flex") {
        databasesContainer.style.display = "none";
        databases.innerHTML = "Show Databases";
    } else {
        databasesContainer.style.display = "flex";
        databases.innerHTML = "Hide Databases";
    }
})

studentsButton.addEventListener('click', () => {
    console.log("changing views....")
    databases.innerHTML = "Students"
    databasesContainer.style.display = "none"
    searchBar.placeholder = 'search students....'

    SetupStudentTable2();

})
booksButton.addEventListener('click', () => {
    console.log("changing views....")
    databases.innerHTML = "Books"
    databasesContainer.style.display = "none"
    searchBar.placeholder = 'search books....'
    SetupBookTable2();
})

rentsButton.addEventListener('click', () => {
    console.log("changing views....")
    databases.innerHTML = "Rents"
    databasesContainer.style.display = "none"
    searchBar.placeholder = 'search rents....'
    SetupRentTable2();

})
adminsButton.addEventListener('click', () => {
    console.log("changing views....")
    databases.innerHTML = "Admins"
    databasesContainer.style.display = "none"
    searchBar.placeholder = 'search admins....'
    SetupAdminTable2();
})
returnButton.addEventListener("click", () => {
    if (rent.firstname === undefined) {
        if (confirm("please select the rent you want to return first".toUpperCase())
            && !(whichTable.toLowerCase().startsWith("ren"))) {
            SetupRentTable2()
        }
    } else {
        if (whichTable.toLowerCase().startsWith("ren")) {
            let confirmed = confirm(
                rent.date +
                "\nAre you sure? Do you want to return".toUpperCase());
            if (confirmed) {
                ReturnBook()
                console.log("the book returned successfully");
            }
        } else {
            let switchTable = confirm("The table is not the rent table.\nDo you want to switch to it?".toUpperCase());
            if (switchTable) {
                SetupRentTable2();
                rent = {}
            }
        }

    }
})

let closeMessageContainer;

refreshButton.addEventListener('click', () => {

    switch (whichTable.toLowerCase()) {

        case "rent":
        case "rents":
            SetupRentTable2();
            break;
        case "student":
        case "students":
            SetupStudentTable2();
            break;
        case "book":
        case "books":
            SetupBookTable2();
            break;
        case "admin":
        case "admins":
            SetupAdminTable2();
            break;

    }

})

deleteButton.addEventListener('click', () => {
    console.log('fetching delete student');
    switch (whichTable.toLowerCase()) {
        case "student":
        case "students":
            deleteStudentEventListener(student);
            break
        case "book":
        case "books":
            deleteBook();
            break;
        case "admin":
        case "admins":
            deleteAdmin();
            break;
    }
})
editModeButton.addEventListener("click", () => {
    editModeEventListener();
})
updateButton.addEventListener("click", async () => {

    if (!editMode) return;

    switch (whichTable.toLowerCase()) {
        case "student":
        case "students":
            updateStudent();
            break;
        case "book":
        case "books":
            updateBook();
            break;
        case "admin":
        case "admins":
            updateAdmin();
            break;
        case "rent":
        case "rents":
            break;
    }
})

async function fillUpdatedStudent() {

    let allStudent = await fetch("../Students/allJSON")
    let studentJSON = await allStudent.json();

    console.log(studentJSON);

    let thisRow;
    let tbody = table.children[0];
    let allRows = tbody.children;
    let oneStudent;

    for (let i = 1; i < tbody.children.length; i++) {
        thisRow = allRows[i];
        oneStudent = studentJSON[i - 1];
        thisRow.children[0].innerHTML = oneStudent['firstname'];
        thisRow.children[1].innerHTML = oneStudent['lastname'];
        thisRow.children[2].innerHTML = oneStudent['studentID'];
        thisRow.children[3].innerHTML = oneStudent['department'];
        thisRow.children[4].innerHTML = oneStudent['gender'];
        thisRow.children[5].innerHTML = oneStudent['dorm'];
        thisRow.children[6].innerHTML = oneStudent['phoneNumber'];
    }

    erasePreview();

}

let editMode = false;

function editModeEventListener() {

    if (student.firstname !== undefined || book.title !== undefined ||
        rent.username !== undefined || admin.username !== undefined)

        if (!editMode) {//editing allowed
            firstname.readOnly = false;
            lastname.readOnly = false;
            studentID.readOnly = false;
            department.readOnly = false;
            gender.readOnly = false;
            dorm.readOnly = false;
            phoneNumber.readOnly = false;
            editMode = true;
            editModeButton.innerHTML = "Edit Mode is ON"
            editModeButton.style.backgroundColor = "blue";
            editModeButton.style.color = "white";
            updateButton.disabled = false;
            deleteButton.disabled = false;
        } else {//editing not allowed or readonly
            firstname.readOnly = true;
            lastname.readOnly = true;
            studentID.readOnly = true;
            department.readOnly = true;
            gender.readOnly = true;
            dorm.readOnly = true;
            phoneNumber.readOnly = true;
            editMode = false;
            editModeButton.innerHTML = "Edit Mode is OFF"
            editModeButton.style.backgroundColor = "gray";
            editModeButton.style.color = "black";
            updateButton.disabled = true;
            deleteButton.disabled = true;
        }
    else {
        sendNotification("Please click the table row you want edit first.")
    }

    console.log("changing mode....")
}

function tableEventListener(e) {
    let length = e.path[1].children.length;
    clickedRow = e.path[1].children;
    if (length > 1) {
        fillPreview(clickedRow);
        e.path[1].children[0].style.backgroundColor = "black;";
    }
}

let before = undefined;

async function fillPreview(row) {

    switch (whichTable.toLowerCase()) {
        case "student":
        case "students":
            fillStudentPreview(row)
            break;
        case "book":
        case "books":
            fillBookPreview(row);
            break;
        case "admin":
        case "admins":
            fillAdminPreview(row);
            break;
        case "rent":
        case "rents":
            fillRentPreview(row);
            break;
    }

}

function fillBookPreview(row) {

    if (row[0].innerHTML.toLowerCase() === "title") {
        return;
    }

    book["title"] = row[0].innerHTML;
    book["category"] = row[1].innerHTML;
    book["quantity"] = row[2].innerHTML;
    book["author"] = row[3].innerHTML;

    console.log(book);

    firstname.value = book['title'];
    lastname.value = book['category'];
    studentID.value = book['quantity'];
    department.value = book['author'];


}

function fillRentPreview(row) {

    if (row[0].innerHTML.toLowerCase() === "firstname") {
        return;
    }

    rent["firstname"] = row[0].innerHTML;
    rent["lastname"] = row[1].innerHTML;
    rent["studentID"] = row[2].innerHTML;
    rent["department"] = row[3].innerHTML;
    rent["title"] = row[4].innerHTML;
    rent["author"] = row[5].innerHTML;
    rent["category"] = row[6].innerHTML;
    rent["phoneNumber"] = row[7].innerHTML;
    rent["date"] = row[8].innerText.toString().split(",")[1];

    console.log(rent);

    firstname.value = rent['firstname'];
    lastname.value = rent['lastname'];
    studentID.value = rent['studentID'];
    department.value = rent['title'];

    gender.value = rent['author'];
    dorm.value = new Date(parseInt(rent["date"]));
    let today = new Date();
    let rentDay = new Date(parseInt(rent["date"]));

    let ref = {
        second : 1000,
        minute : 1000*60,
        hour : 1000*60*60,
        day : 1000*60*60*24
    }

    let microDifference = today - rentDay;
    let DateDifference = parseInt(microDifference/ref.day)%365;
    let HourDifference = parseInt(microDifference/ref.hour)%24;
    let MinuteDifference = parseInt(microDifference/ref.minute)%60;

    let priceBirr = Math.ceil(0.50*DateDifference)

    phoneNumber.value = priceBirr +" Birr " + DateDifference + " D " + HourDifference
        + " H " + MinuteDifference + " M";
    // phoneNumber.value = difference;

}

function fillStudentPreview(row) {

    if (row[0].innerHTML.toLowerCase() === "firstname") {
        return;
    }

    student["firstname"] = row[0].innerHTML;
    student["lastname"] = row[1].innerHTML;
    student["studentID"] = row[2].innerHTML;
    student["department"] = row[3].innerHTML;
    student["gender"] = row[4].innerHTML;
    student["dorm"] = row[5].innerHTML;
    student["phoneNumber"] = row[6].innerHTML;

    firstname.value = student['firstname'];
    lastname.value = student['lastname'];
    studentID.value = student['studentID'];
    department.value = student['department'];
    gender.value = student['gender'];
    dorm.value = student['dorm'];
    phoneNumber.value = student['phoneNumber'];
}

function fillAdminPreview(row) {

    if (row[0].innerHTML.toLowerCase() === "firstname") {
        return;
    }

    admin["firstname"] = row[0].innerHTML;
    admin["lastname"] = row[1].innerHTML;
    admin["username"] = row[2].innerHTML;
    admin["password"] = row[3].innerHTML;
    admin["phoneNumber"] = row[4].innerHTML;

    console.log(admin);

    firstname.value = admin['firstname'];
    lastname.value = admin['lastname'];
    studentID.value = admin['username'];
    department.value = admin['password'];
    phoneNumber.value = admin['phoneNumber'];
}

function erasePreview() {
    firstname.value = ""
    lastname.value = ""
    studentID.value = ""
    department.value = ""
    gender.value = ""
    dorm.value = ""
    phoneNumber.value = ""
}

async function deleteStudentEventListener(student) {
    if (!editMode) {
        document.querySelector(".info-h1").innerHTML = "Enable \"Edit Mode\" first"
        setTimeout(() => {
            document.querySelector(".info-h1").innerHTML = ""
        }, 3000)
        return;
    }
    let response = await fetch("students/delete", {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            firstname: student.firstname,
            lastname: student.lastname,
            studentID: student.studentID,
            department: student.department,
            gender: student.gender,
            dorm: student.dorm
        })
    })
    if (response.status !== 200) {
        console.log("problem with your network....")
        return;
    }
    let value = await response.json();
    if (value.acknowledged) {
        if (value.deletedCount > 0) {
            console.log(value.deletedCount + " students deleted")
            if (clickedRow !== undefined) {
                console.log(clickedRow[0]);
                for (let i = 0; i < clickedRow.length; i++) {
                    console.log(clickedRow[i]);
                    clickedRow[i].style.display = "none";
                }
                let deletedMessage = student.firstname + " " + student.lastname
                    + " deleted successfully"
                document.querySelector(".info-h1").innerHTML = deletedMessage;
            }

        } else {
            console.log("no matching student found....")
            console.log("unable to delete the student.")
        }
    } else {
        console.log("problem with the database.....")
    }
}
