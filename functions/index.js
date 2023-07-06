const functions = require("firebase-functions");
const appHelloWorld = require("./appHelloWorld");
const appChatGPT = require("./appChatGPT");
const {onUpdateUser, onCreateUser} = require("./watchHandlers/appUser");
const appVacationTrip = require("./appVacationTrips");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.userCreated = functions.firestore.document('users/{docId}')
    .onCreate(async (change, context) => {
        await onCreateUser(change, context)
    });
exports.userWrite = functions.firestore.document('users/{docId}')
    .onUpdate(async (change, context) => {
        await onUpdateUser(change, context)
    });



exports.helloWorld=  functions.https.onRequest(appHelloWorld);
exports.chatgpt=  functions.https.onRequest(appChatGPT);
exports.vacationTrip=  functions.https.onRequest(appVacationTrip);


