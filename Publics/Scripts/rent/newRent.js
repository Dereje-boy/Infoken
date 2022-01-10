//adding event listener to the book table
let StudentClickedRow;
let BookClickedRow;

const StudentSearchButton = document.querySelector(".student-search-button")
const BookSearchButton = document.querySelector(".search-book-button")

const StudentSearchInput = document.querySelector(".student-search-input")
const BookSearchInput = document.querySelector(".book-search-input")

const StudentSearchBy = document.querySelector(".student-search-by")
const BookSearchBy = document.querySelector(".book-search-by")

StudentSearchButton.addEventListener("click",async ()=>{
    let toServer = {
        search_by: StudentSearchBy[StudentSearchBy.selectedIndex].innerText,
        search_by_value: StudentSearchInput.value
    }
    switch (StudentSearchBy.selectedIndex) {
        case 0:
            let response = await fetch("../../students/search",{
                method:"post",
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify(toServer)
            })

            let result = await response.json()
            Student_to_Table(result)
            break;
        case 1:
            let response1 = await fetch("../../students/search",{
                method:"post",
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify(toServer)
            })

            let result1 = await response1.json()
            Student_to_Table(result1)
            break;
        case 2:
            let response2 = await fetch("../../students/search",{
                method:"post",
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify(toServer)
            })

            let result2 = await response2.json()
            Student_to_Table(result2)
            break;
        case 3:
            let response3 = await fetch("../../students/search",{
                method:"post",
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify(toServer)
            })

            let result3 = await response3.json()
            Student_to_Table(result3)
            break;
        default:
            let response4 = await fetch("../../students/search",{
                method:"post",
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify(toServer)
            })

            let result4 = await response4.json()
            Student_to_Table(result4)
    }
})
BookSearchButton.addEventListener("click",async ()=>{
    console.log("searching for books");
    let toServer = {
        search_by: BookSearchBy[BookSearchBy.selectedIndex].innerText,
        search_by_value: BookSearchInput.value
    }
    console.log(toServer);
    switch (BookSearchBy.selectedIndex) {
        case 0:
            let response = await fetch("../../books/search",{
                method:"post",
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify(toServer)
            })

            let result = await response.json()
            Book_to_Table(result)
            break;
        case 1:
            let response1 = await fetch("../../books/search",{
                method:"post",
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify(toServer)
            })

            let result1 = await response1.json()
            Book_to_Table(result1)
            break;
        case 2:
            let response2 = await fetch("../../books/search",{
                method:"post",
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify(toServer)
            })

            let result2 = await response2.json()
            Book_to_Table(result2)
            break;
        case 3:
            let response3 = await fetch("../../books/search",{
                method:"post",
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify(toServer)
            })

            let result3 = await response3.json()
            Book_to_Table(result3)
            break;
        default:
            let response4 = await fetch("../../books/search",{
                method:"post",
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify(toServer)
            })

            let result4 = await response4.json()
            Book_to_Table(result4)
    }
})

studentTable.addEventListener("click", StudentTableClick);

function StudentTableClick(e) {
    const clickedRow = e.path[1].children;

    if (clickedRow[0].innerText === "Check") return

    //if it is radio
    if (clickedRow.length < 2) {
        let newClickedRow = clickedRow[0].parentNode.parentNode

        processStudentRowRadio(clickedRow[0].parentElement.parentElement.childNodes)
        StudentClickedRow = clickedRow[0].parentElement.parentElement.childNodes;

    } else {//if it is normal td
        processStudentRow(clickedRow)
        StudentClickedRow = clickedRow
    }

}

function processStudentRow(clickedRow) {
    let firstname = clickedRow.item(1).innerText
    let lastname = clickedRow.item(2).innerText
    let radio = clickedRow.item(0)
    radio.children[0].click();
    studentName.innerHTML = firstname + " " + lastname
}

function processStudentRowRadio(clickedRow) {
    let firstname = clickedRow.item(1).innerText;
    let lastname = clickedRow.item(2).innerText;
    studentName.innerHTML = firstname + " " + lastname
}

//adding event listener to the book table
bookTable.addEventListener("click", BookTableClick);

function BookTableClick(e) {
    const clickedRow = e.path[1].children;
    if (clickedRow[0].innerText === "Check") return


    //if it is radio
    if (clickedRow.length < 2) {
        processBookRowRadio(clickedRow[0].parentElement.parentElement.childNodes)
        BookClickedRow = clickedRow[0].parentElement.parentElement.childNodes;

    } else {//if it is normal td
        processBookRow(clickedRow)
        BookClickedRow = clickedRow;

    }

}

function processBookRow(clickedRow) {
    let title = clickedRow.item(1).innerText
    let radio = clickedRow.item(0)
    radio.children[0].click()
    bookName.innerHTML = title
}

function processBookRowRadio(clickedRow) {
    bookName.innerHTML = clickedRow.item(1).innerText
}

ButtonRent.addEventListener('click', ButtonRentClick)

async function ButtonRentClick(e) {

    RentContainer.style.marginTop = "210px"
    Notification.style.top = "140px"

    if (StudentClickedRow === undefined) {
        console.log("please select student first");
        SendFialureNotification({
            isSuccessfull: false,
            reason: "Student not Selected",
            recommendation: "Please select the student from the student table below"
        })
        return;
    }

    let firstname = StudentClickedRow[1].innerText
    let lastname = StudentClickedRow[2].innerText
    let department = StudentClickedRow[3].innerText
    let studentID = StudentClickedRow[4].innerText
    let dorm = StudentClickedRow[5].innerText
    let phoneNumber = StudentClickedRow[6].innerText

    let thisStudent = {
        firstname, lastname, studentID, department, dorm, phoneNumber
    }

    if (BookClickedRow === undefined) {
        console.log("please select book first");
        SendFialureNotification({
            isSuccessfull: false,
            reason: "Book not Selected",
            recommendation: "Please select the book from the book table below"
        })
        return;
    }

    let title = BookClickedRow[1].innerText
    let category = BookClickedRow[2].innerText
    let author = BookClickedRow[3].innerText

    let thisBook = {
        title, category, author
    }

    let thisRent = {
        firstname: thisStudent.firstname,
        lastname: thisStudent.lastname,
        studentID: thisStudent.studentID,
        department: thisStudent.department,
        dorm: thisStudent.dorm,
        phoneNumber: thisStudent.phoneNumber,
        title: thisBook.title,
        category: thisBook.category,
        author: thisBook.author
    }

    fetch("/rents/added", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(thisRent)
    }).then(async value => {
        let body = await value.json();
        console.log(body);

        if (body.isSuccessfull) {
            SendSuccessNotification({
                isSuccessfull: body.isSuccessfull,
                reason: body.reason,
                recommendation: body.recommendation
            })
        } else {
            SendFialureNotification({
                isSuccessfull: body.isSuccessfull,
                reason: body.reason,
                recommendation: body.recommendation
            })
        }

    }).catch(error => {
        console.log(error);
    })
}

const Notification = document.querySelector(".notification")
const RentContainer = document.querySelector(".rent-container")

const IsSuccessfull = document.querySelector(".isSuccessfull")
const Reason = document.querySelector(".reason")
const Recommendation = document.querySelector(".recommendation")
const ImageNotification = document.querySelector(".notification-image")
const ShowHiddenMessageButton = document.querySelector(".show-hidden-message")

let NotificationHidden = true
let HideNotificationVariable;

ShowHiddenMessageButton.addEventListener("click", (e) => {
    ShowHiddenMessageButton.innerText = "Hide message"
    RentContainer.style.marginTop = "210px"
    Notification.style.top = "140px"
    NotificationHidden = false
    clearTimeout(HideNotificationVariable)
    if (!NotificationHidden) {
        HideNotificationVariable = setTimeout(() => {
            RentContainer.style.marginTop = "130px"
            Notification.style.top = "60px"
            NotificationHidden = true
            ShowHiddenMessageButton.innerText = "show hidden message"
        }, 5000)
    }
})

function SendSuccessNotification(message) {
    NotificationHidden = false
    clearTimeout(HideNotificationVariable)
    ImageNotification.src = "/Images/success.png"
    ShowHiddenMessageButton.innerText = "Hide message"

    if (message !== undefined) {
        IsSuccessfull.innerText = message.isSuccessfull
        Reason.innerText = message.reason
        Recommendation.innerText = message.recommendation
    } else {
        IsSuccessfull.innerText = "True"
        Reason.innerText = "Your rent screen is loaded successfully"
        Recommendation.innerText = "Now you can rent to or return books from students. Have a good time!"
    }
    Notification.style.backgroundColor = "#177217"
    IsSuccessfull.style.color = "White";

    if (!NotificationHidden) {
        HideNotificationVariable = setTimeout(() => {
            RentContainer.style.marginTop = "130px"
            Notification.style.top = "60px"
            NotificationHidden = true
            ShowHiddenMessageButton.innerText = "show hidden message"
        }, 5000)
    }
}

function SendFialureNotification(message) {
    NotificationHidden = false
    clearTimeout(HideNotificationVariable)

    ImageNotification.src = "/Images/error.png"
    ShowHiddenMessageButton.innerText = "Hide message"

    IsSuccessfull.innerText = message.isSuccessfull
    Reason.innerText = message.reason
    Recommendation.innerText = message.recommendation

    Notification.style.backgroundColor = "#723117"

    if (!NotificationHidden) {
        HideNotificationVariable = setTimeout(() => {
            RentContainer.style.marginTop = "130px"
            Notification.style.top = "60px"
            NotificationHidden = true
            ShowHiddenMessageButton.innerText = "show hidden message"
        }, 5000)
    }
}

SendSuccessNotification();