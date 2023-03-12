const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {isAuth} = require("./server/apiSecurity");


const appHelloWorld = express();

appHelloWorld.use(cors());
appHelloWorld.use(bodyParser.urlencoded({extended: false}));
appHelloWorld.use(bodyParser.json());

//get the profile for the person logged in
appHelloWorld.get("/", isAuth,
    async (req, res) => {
         res.json({message:"hello world"})


    });
module.exports = appHelloWorld;
