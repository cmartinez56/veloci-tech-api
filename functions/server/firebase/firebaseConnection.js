const firebaseAdmin = require("firebase-admin");
const {initializeApp} = require("firebase-admin/app");
const serviceAccount = require("./SA-veloci-tech.json");


if (process.env.ENVIRONMENT === 'Local') {
    const serviceAccount =  require("./SA-veloci-tech.json");
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

