const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const port = 3000;
const app = express();

app.set('view engine', 'ejs'); //Use EJS
app.use(bodyParser.urlencoded({extended: true})); //Used for parsing data from the HTML form
app.use(express.static("public"))

const tasks = ["Buy Food", "Make Food", "Eat Food"];

const workTasks = [];

app.get("/", (req, res) => {
    const day = date.getDate();

    res.render('list', {listTitle: day, listItems: tasks, route: "/"});
});

app.post("/", (req, res) => {
    const task = req.body.newItem;
    tasks.push(task);
    res.redirect("/");
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", listItems: workTasks, route: "/work"});
});

app.post("/work", (req, res) => {
    const workTask = req.body.newItem;
    workTasks.push(workTask);
    res.redirect("/work");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
})