/*
* getting access to the document
* getting data from the backend and sending back again
* sending to the frontend
* */
document.querySelector("title").innerText = "New Rent"
const studentTable = document.querySelector(".student-table table");
const bookTable = document.querySelector(".book-table table");
const studentName = document.querySelector(".student-name")
const bookName = document.querySelector(".book-name")
const ButtonRent = document.querySelector(".button-rent");

function Student_to_Table(students) {

    let tbody = document.createElement("tbody");

    //get all students and then process here....
    students.forEach(st=>{
        let tr = document.createElement("tr");

        let check_td = document.createElement("td");
        let firstname_td = document.createElement("td");
        let lastname_td = document.createElement("td");
        let student_td = document.createElement("td");
        let department_td = document.createElement("td");
        let dorm_td = document.createElement("td");
        let phoneNumber_td = document.createElement("td");

        check_td.innerHTML = "<input type=\"radio\" name=\"select\">"
        check_td.classList.add("studentRadio")

        firstname_td.innerText = st.firstname;
        lastname_td.innerText = st.lastname;
        department_td.innerText = st.department;
        student_td.innerText = st.studentID;
        dorm_td.innerText = st.dorm;
        phoneNumber_td.innerText = st.phoneNumber;

        tr.append(check_td,firstname_td,lastname_td,
            department_td,student_td,
            dorm_td,phoneNumber_td,)
        tbody.append(tr)
    })

    studentTable.children[1].innerHTML = tbody.innerHTML
}


function Book_to_Table(books) {


    let tbody = document.createElement("tbody");

    //get all books and then process here....
    books.forEach(book=>{

        //
        let tr = document.createElement("tr");
        let check = document.createElement("td");

        let titel_td = document.createElement("td");
        let category = document.createElement("td");
        let quatity = document.createElement("td");
        let author = document.createElement("td");

        check.innerHTML = "<input type=\"radio\" name=\"select-book\">"
        titel_td.innerText = book.title;
        category.innerText = book.category;
        quatity.innerText = book.quantity;
        author.innerText = book.author;

        tr.append(check,titel_td,category,
            author,quatity)

        tbody.append(tr)
    })

    bookTable.children[1].innerHTML = tbody.innerHTML
}

async function fetchStudents(incoming) {
    let response = await fetch("/students/all");
    let result = await response.json();
    Student_to_Table(result)
}

async function fetchBooks(incoming) {
    let response = await fetch("/books/all");
    let result = await response.json();
    Book_to_Table(result)

}
fetchStudents();
fetchBooks();