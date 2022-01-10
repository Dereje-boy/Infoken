const express = require("express")
const router = express.Router()
const Books_Controller = require("../Controllers/Books")

// /books
router.get("/", (req, res) => {
    res.send("booking ok...")
})
router.get("/new", async (req, res) => {
    res.render("newBook",
        {
            admin_username: res.user.realUsername,
            admin_fullname: res.user.realFirstname + " " + res.user.realLastname,
        }
    );

})
router.post("/update", async (req, res) => {
    console.log("updating the book")
    const book = {
        title: req.body.title,
        category: req.body.category,
        quantity: req.body.quantity,
        author: req.body.author,

        newTitle: req.body.newTitle,
        newCategory: req.body.newCategory,
        newQuantity: req.body.newQuantity,
        newAuthor: req.body.newAuthor,
    }

    console.log(book);

    let updateResult = await Books_Controller.updateBook(book);
    console.log(updateResult)
    res.json(updateResult)

})
router.post("/delete", async (req, res) => {
    console.log("deleting the book")
    const book = {
        title: req.body.title,
        category: req.body.category,
        quantity: req.body.quantity,
        author: req.body.author,
    }

    console.log(book);

    let deleteResult = await Books_Controller.deleteBook(book);
    console.log(deleteResult)
    res.json(deleteResult)

})

router.post("/new", async (req, res) => {

    let title = req.body.title;
    let category = req.body.category;
    let quantity = req.body.quantity;
    let author = req.body.author;

    if ( !title ) {
        console.log("data is not fill out...")
        res.render("newbook", {message: "please fill all the fields"})
        return
    }

    if (!quantity) quantity = 1;
    const book = {title, category, quantity, author}
    Books_Controller.addBook(book);

    res.render("newBook", {message: "\" " + req.body.title + " \" is added successfully"})
})

router.get("/all", async (req, res) => {
    const allBooks = await Books_Controller.allBooks();

    res.send(allBooks)
})

router.post("/search",async (req,res)=>{

    let search = {
        search_by : req.body.search_by,
        search_by_value : req.body.search_by_value,
    }

    let result = await Books_Controller.searchBook(search);

    res.json(result);

})

module.exports = router
