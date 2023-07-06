const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {isAuth} = require("./server/apiSecurity");
const {getAllInCollection} = require("./server/firebase/firestore/firestoreGet");


const appVacationTrip = express();

appVacationTrip.use(cors());
appVacationTrip.use(bodyParser.urlencoded({extended: false}));
appVacationTrip.use(bodyParser.json());

//get the profile for the person logged in
appVacationTrip.get("/", isAuth,
    async (req, res) => {
        res.json(    await getAllInCollection('vacationTrips')
        )


    });
module.exports = appVacationTrip;
