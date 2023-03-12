const functions = require("firebase-functions");
const appHelloWorld = require("./appHelloWorld");
const appChatGPT = require("./appChatGPT");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const user = functions.auth;



exports.helloWorld=  functions.https.onRequest(appHelloWorld);
exports.chatgpt=  functions.https.onRequest(appChatGPT);

