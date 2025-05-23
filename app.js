const cookieParser = require("cookie-parser");
const express = require("express");
const path = require('path')
const app = express() ;
const userModel = require('./models/user') ; 


app.set('view engine' , 'ejs') ;
app.use(express.json());
app.use(express.urlencoded({ extended : true })); 
app.use(express.static(path.join(__dirname , 'public')));
app.use(cookieParser()) ;


app.get("/", (req, res) => {

    res.render('index');

});

app.post("/create", async (req, res) => {

    let { username , age , password , email } = req.body ; 

    let createdUser = await userModel.create({
        username ,
        age ,
        password,
        email,
    }) ;

    res.send(createdUser) ;

});


app.listen(3000);