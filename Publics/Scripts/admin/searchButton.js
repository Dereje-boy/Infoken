searchButton.addEventListener('click', async () => {
    performSearch();
})
searchBar.addEventListener('input', async () => {
    performSearch();
})

SelectSearchBy.addEventListener('change', async () => {
    performSearch();
})

function performSearch() {
    let search_by_value = searchBar.value;
    let search = whichTable.toString().toLowerCase()

    if (search_by_value.length === 0) {
        switch (search) {
            case "rent":
            case "rents":
                SetupRentTable2();
                break;
            case "admin":
            case "admins":
                SetupAdminTable2();
                break;
            case "student":
            case "students":
                SetupStudentTable2();
                break;
            case "book":
            case "books":
                SetupBookTable2();
                break;
        }
        return
    }

    if (search.startsWith("re")) {
        let search_by = SelectSearchBy[SelectSearchBy.selectedIndex].innerText;

        let toServer = {
            search_by: search_by,
            search_by_value: search_by_value
        }

        console.log("searching for rents");
        searchRents(toServer);

    } else if (search.startsWith("ad")) {
        let search_by = SelectSearchBy[SelectSearchBy.selectedIndex].innerText;

        let toServer = {
            search_by: search_by,
            search_by_value: search_by_value
        }

        searchAdmins(toServer);

    } else if (search.startsWith("book")) {
        let search_by = SelectSearchBy[SelectSearchBy.selectedIndex].innerText;

        let toServer = {
            search_by: search_by,
            search_by_value: search_by_value
        }

        searchBooks(toServer);

    } else if (search.startsWith("student")) {

        console.log("searching for students");
        let search_by = SelectSearchBy[SelectSearchBy.selectedIndex].innerText;

        let toServer = {
            search_by: search_by,
            search_by_value: search_by_value
        }

        searchStudents(toServer);
    }
}

function searchRents(toServer) {
    fetch("../rents/search", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(toServer)
    }).then(async value => {
        let result = await value.json()
        SetupRentTable2(result)
    }).catch(error => {
        console.log(error);
    })
}

function searchStudents(toServer) {
    fetch("../students/search", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(toServer)
    }).then(async value => {
        let result = await value.json()
        console.log(result);
        SetupStudentTable2(result)
    }).catch(error => {
        console.log(error);
    })
}

function searchAdmins(toServer) {

    fetch("../admin/search", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(toServer)
    }).then(async value => {

        try{
            let result = await value.json()
            console.log(result);
            SetupAdminTable2(result)
        }catch (e) {
            console.log(error);
        }

    }).catch(error => {
        console.log(error);
    })

}
function searchBooks(toServer) {

    fetch("../books/search", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(toServer)
    }).then(async value => {
        try{
            let result = await value.json()
            console.log(result);
            SetupBookTable2(result)
        }catch (e) {
            console.log(error);
        }
    }).catch(error => {
        console.log(error);
    })

}
