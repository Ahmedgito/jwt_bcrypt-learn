const express = require("express");
const app = express();

const path = require('path')
const userModel = require('./models/user');
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get("/", (req, res) => {

    res.render('index');

});

app.post("/create", (req, res) => {

    let { username, age, password, email } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {

            let createdUser = await userModel.create({
                username,
                age,
                password: hash,
                email,
            });

            let token = jwt.sign({ email }, 'shhhhhh')
            res.cookie("token", token);

            res.send(createdUser);

        })
    });

});


app.get("/logout", (req, res) => {

    res.cookie("token", "");
    res.redirect('/')

})

app.listen(3000);