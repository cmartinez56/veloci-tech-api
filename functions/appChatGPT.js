const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {isAuth} = require("./server/apiSecurity");
const {sendChatApi} = require("./server/openai/openaiMessages");


const appChatGPT = express();

appChatGPT.use(cors());
appChatGPT.use(bodyParser.urlencoded({extended: false}));
appChatGPT.use(bodyParser.json());

//get the profile for the person logged in
appChatGPT.post("/", isAuth,
    async (req, res) => {

        res.json(await sendChatApi(req.body.messages));


    });

appChatGPT.get("/template", isAuth,
    async (req, res) => {
       const messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"},
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            {"role": "user", "content": "Where was it played?"}
        ]
        console.log(response)
        res.json({messages, env:process.env.ENVIRONMENT})


    });
module.exports = appChatGPT;
