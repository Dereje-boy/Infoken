async function SetupBookTable() {

    //hiding the previous table and showing this table
    showTable("book")
    whichTable="book";

    const response = await fetch("../books/all");
    const result = await response.json();

    let bookBody = bookTable.children[0];

    for (let i = 0; i < result.length; i++) {
        let thisBook = result[i]

        let thisRow = document.createElement("tr");

        let title = document.createElement("td");
        title.innerHTML = thisBook['title'];

        let author = document.createElement("td");
        author.innerHTML = thisBook['author'];

        let _id = document.createElement("td");
        _id.innerHTML = thisBook['_id'];

        let category = document.createElement("td");
        category.innerHTML = thisBook['category'];

        let quantity = document.createElement("td");
        quantity.innerHTML = thisBook['quantity'];

        thisRow.append(_id, title, category, quantity, author);
        bookBody.append(thisRow);
    }

    SetupBookInfo()
}

function SetupBookInfo() {

    //changing the Label
    infoFirstname.children[0].innerHTML = "Title";
    infoLastname.children[0].innerHTML = "Category";
    infoDepartment.children[0].innerHTML = "Quantity";
    infoStudentID.children[0].innerHTML = "Author";
    infoGender.children[0].innerHTML = "";
    infoDorm.children[0].innerHTML = "";
    infoPhoneNumber.children[0].innerHTML = "";

    //making the input field placeholder clear
    infoFirstname.children[1].placeholder = "";
    infoLastname.children[1].placeholder = "";
    infoDepartment.children[1].placeholder = "";
    infoStudentID.children[1].placeholder = "";
    infoGender.children[1].placeholder = "";
    infoDorm.children[1].placeholder = "";
    infoPhoneNumber.children[1].placeholder = "";

    //clearing the input values
    infoFirstname.children[1].value = "";
    infoLastname.children[1].value = "";
    infoDepartment.children[1].value = "";
    infoStudentID.children[1].value = "";
    infoGender.children[1].value = "";
    infoDorm.children[1].value = "";
    infoPhoneNumber.children[1].value = "";

}

async function SetupAdminTable() {
    const response = await fetch("../admin/all");
    const result = await response.json()

    // table.style.display = "none";
    // adminTable.style.display = "block";
    //
    // let adminBody = adminTable.children[0];
    //
    // for (let i=0; i<result.length; i++){
    //     let oneAdmin = result[i];
    //
    //     let thisRow = document.createElement("tr");
    //
    //     let firstname = document.createElement("td")
    //     let lastname = document.createElement("td")
    //     let username = document.createElement("td")
    //     let password = document.createElement("td")
    //     let phoneNumber = document.createElement("td")
    //
    //     firstname.innerHTML = oneAdmin["firstname"];
    //     lastname.innerHTML = oneAdmin["lastname"];
    //     username.innerHTML = oneAdmin["username"];
    //     password.innerHTML = oneAdmin["password"];
    //     phoneNumber.innerHTML = oneAdmin["phoneNumber"];
    //
    //     thisRow.append(firstname,lastname,username,password,phoneNumber);
    //
    //     adminBody.append(thisRow)
    // }

    table.style.display = "block";
    table.children[0].remove();

    //build header
    let adminTableHeaders = ["Firstname","Lastname","Username","Password","Phone Number"]

    let AdminRowHeader = document.createElement("tr")
    let AdminTbody = document.createElement("tbody");

    //assigning headers
    for (let i = 0; i < 5; i++) {
        let thisTh = document.createElement("th");
        thisTh.innerHTML = adminTableHeaders[i];
        AdminRowHeader.append(thisTh);
    }

    AdminTbody.append(AdminRowHeader);
    table.append(AdminTbody);

    console.log(table);

    SetupAdminInfo();

}

function bookTableEventListener(e) {
    clickedRow = e.path[1].children;
    let length = e.path[1].children.length;

    if (length === 5 && !(clickedRow[1].innerHTML.toLowerCase() === "title")) {
        fillAdminTablePreview(clickedRow);
        e.path[1].children[0].style.backgroundColor = "black;";
    } else {
        erasePreview();
    }
}

function SetupAdminInfo() {

    //changing the Label
    infoFirstname.children[0].innerHTML = "Firstname";
    infoLastname.children[0].innerHTML = "Lastname";
    infoDepartment.children[0].innerHTML = "Username";
    infoStudentID.children[0].innerHTML = "Password";
    infoGender.children[0].innerHTML = "Phone Number";
    infoDorm.children[0].innerHTML = "";

    //making the input field correspondent
    infoFirstname.children[1].placeholder = "";
    infoLastname.children[1].placeholder = "";
    infoDepartment.children[1].placeholder = "";
    infoStudentID.children[1].placeholder = "";
    infoGender.children[1].placeholder = "";
    infoDorm.children[1].placeholder = "";

}

function SetupStudentInfo() {

    //changing the Label
    infoFirstname.children[0].innerHTML = "Firstname";
    infoLastname.children[0].innerHTML = "Lastname";
    infoDepartment.children[0].innerHTML = "Student ID";
    infoStudentID.children[0].innerHTML = "Department";
    infoGender.children[0].innerHTML = "Gender";
    infoDorm.children[0].innerHTML = "Dorm";

    //making the input field correspondent
    infoFirstname.children[1].placeholder = "";
    infoLastname.children[1].placeholder = "";
    infoDepartment.children[1].placeholder = "";
    infoStudentID.children[1].placeholder = "";
    infoGender.children[1].placeholder = "";
    infoDorm.children[1].placeholder = "";

}

function AdminTableEventListener(e) {
    whichTable = "admin";

    clickedRow = e.path[1].children;
    let length = e.path[1].children.length;

    if (length === 5 && !(clickedRow[0].innerHTML.toLowerCase() === "firstname")) {
        fillAdminTablePreview(clickedRow);
        e.path[1].children[0].style.backgroundColor = "black;";
    } else {
        erasePreview();
    }
}

function fillAdminTablePreview(row) {
    console.log("displaying the selected row");
    // _id title category quantity author
    infoFirstname.children[1].value = row[0].innerHTML
    infoLastname.children[1].value = row[1].innerHTML
    infoDepartment.children[1].value = row[2].innerHTML
    infoStudentID.children[1].value = row[3].innerHTML
    infoGender.children[1].value = row[4].innerHTML
}

function showTable(WhichTable) {

    bookTable.style.display = "none"
    adminTable.style.display = "none"
    rentTable.style.display = "none"
    table.style.display = "none"

    switch (WhichTable.toLowerCase()) {
        case "book":
            bookTable.style.display = "block"
            break;
        case "admin":
            adminTable.style.display = "block"
            break;
        case "rent":
            rentTable.style.display = "block"
            break;
        case "student":
            table.style.display = "block"
            break;
    }
}