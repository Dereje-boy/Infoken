async function updateStudent() {

    student["newFirstname"] = firstname.value
    student["newLastname"] = lastname.value
    student["newStudentID"] = studentID.value
    student["newDepartment"] = department.value
    student["newGender"] = gender.value
    student["newDorm"] = dorm.value
    student["newPhoneNumber"] = phoneNumber.value

    let response = await fetch("../students/update", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(student)
    });

    if (response === undefined || response === null) {
        sendNotification("Unable to send the request.")
        return
    }

    let result = await response.json();

    if (result["acknowledged"] === true && result["modifiedCount"] === 1) {

        sendNotification("The student was updated successfully.");

        fillUpdatedStudent();

    } else {
        sendNotification("The student wasn't updated successfully.")
    }
}

async function updateBook() {

    console.log("updating the book..");

    book["newTitle"] = firstname.value
    book["newCategory"] = lastname.value
    book["newQuantity"] = studentID.value
    book["newAuthor"] = department.value

    let response = await fetch("../books/update", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(book)
    })

    if (response === undefined || response === null) {
        sendNotification("Unable to send the request.")
        return
    }

    let result = await response.json();

    console.log(result);

    if (result["acknowledged"] === true && result["modifiedCount"] === 1) {

        sendNotification("The Book was updated successfully.");

        SetupBookTable2();

    } else {
        sendNotification("The book wasn't updated successfully.")
    }

}

async function updateAdmin() {

    console.log("updating the admin..");

    admin["Newfirstname"] = firstname.value
    admin["Newlastname"] = lastname.value
    admin["Newusername"] = studentID.value
    admin["Newpassword"] = department.value
    admin["NewphoneNumber"] = phoneNumber.value


    let response = await fetch("../admin/update", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(admin)
    })

    if (response === undefined || response === null) {
        sendNotification("Unable to send the request.")
        return
    }

    let result = await response.json();

    console.log(result);

    if (result["acknowledged"] === true && result["modifiedCount"] === 1) {

        sendNotification("The Admin was updated successfully.");

        SetupAdminTable2();

    } else {
        sendNotification("The Admin wasn't updated successfully.")
    }

}

async function deleteBook() {

    console.log("deleting the book..");

    let response = await fetch("../books/delete", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(book)
    })

    if (response === undefined || response === null) {
        sendNotification("Unable to send the request.")
        return
    }

    let result = await response.json();

    if (result["acknowledged"] === true && result["deletedCount"] === 1) {

        sendNotification("The Book was deleted successfully.");

        SetupBookTable2();

    } else {
        sendNotification("The book wasn't deleted successfully.")
    }

}

async function deleteAdmin() {

    console.log("deleting the admin..");

    let response = await fetch("../admin/delete", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(admin)
    })

    if (response === undefined || response === null) {
        sendNotification("Unable to send the request.")
        return
    }

    let result = await response.json();

    if (result["acknowledged"] === true && result["deletedCount"] === 1) {

        sendNotification("The Admin was deleted successfully.");

        SetupAdminTable2();

    } else {
        sendNotification("The Admin wasn't deleted successfully.")
    }

}

async function ReturnBook() {
    if (!(rent.firstname === undefined)) {
        console.log(rent);
        fetch("/rents/delete", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(rent)
        }).then(async value => {
            let result = await value.json()
            console.log(result);
            if (result.acknowledged === true &&
                result.modifiedCount == 1) {
                SetupRentTable2();
            }
            // SetupRentTable_by_Search(result)
        }).catch(error => {
            console.log(error);
        })
    } else {
        console.log("this is the empty rent indicator");
    }

}

function sendNotification(notification) {
    document.querySelector(".info-h1").innerHTML = notification;
    setTimeout(() => {
        document.querySelector(".info-h1").innerHTML =
            "";
    }, 3000)
}