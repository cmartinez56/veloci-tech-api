const firebaseAdmin = require("firebase-admin");
const {initializeApp} = require("firebase-admin/app");


if (process.env.ENVIRONMENT === 'Local') {
    const serviceAccount =  require("../../SA-sandbox-veloci.json");
    initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount)
    });

   /* firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount)
    });

    return firebaseAdmin.auth()*/
} else {

    initializeApp()
}

