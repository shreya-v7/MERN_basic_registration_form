const express= require ("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { response, Router } = require("express");
const { Db } = require("mongodb");
var router = express.Router();

const app = express();
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs') ;

app.get('', (req, res) => {
    res.render('form', {currentUser:req.user});
})
app.get('/admin', (req, res) => {
    res.render("admin", { currentUser: req.user });
})
app.get('/user', (req, res) => {
    res.render("user", { currentUser: req.user });
});

mongoose.connect("mongodb://localhost:27017/shreya",{useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    name: String,
    dob: String,
    contact: Number,
    email: String,
    address: String,
    type: String,
    password: String,
});

const User = mongoose.model("User",userSchema);

app.post('/userconfirm', function (req, res) {

    var username = req.body.username;
    var date = req.body.dob;
    var phone = req.body.contact;
    var mail = req.body.email;
    var address = req.body.address;
    var pwd = req.body.password;

    User.insertMany([{
        name: username,
        dob: date,
        phone: phone,
        email: mail,
        address: address,
        password: pwd
    }], function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully saved all the records")
        }
    });

    res.render('form', {currentUser:req.user});
});

app.get("", function (req, res) {
    res.render('form', {currentUser:req.user});
})


app.get("/user", function (req, res) {
    res.render('user', {currentUser:req.user});

});

module.exports.getSubscribers = function(){
    var user = User.find({});
    return user;
};


app.get('/admin', function(req, res){
    var subs = user.getSubscribers().toArray();
    console.log(subs);
    res.render('admin',{subs: subs} );
});


app.listen(3000, function () {
    console.log("server has started on 3000");
});