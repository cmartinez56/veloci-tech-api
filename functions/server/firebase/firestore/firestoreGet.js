const admin = require("firebase-admin");
const { Timestamp, FieldValue, getFirestore} = require('firebase-admin/firestore');

const firestore = admin.firestore();
const db = getFirestore();

const filterFirestore =  async (collectionName, filterConfigs) => {
    let col = firestore.collection(collectionName);
    filterConfigs.forEach((filterConfig) => {
        col = col.where(...filterConfig);
    });
    const response = await col.get();
    return response.docs.map(doc => ({ id: doc.id, doc: doc.data(), docRef:doc.ref}));
}

const getAllInCollection = async (collectionName, docOnly = false) => {
    const response = await firestore.collection(collectionName).get();
    if(docOnly)
        return response.docs.map(doc => doc.data());
    else
        return response.docs.map(doc => ({ id: doc.id, doc: doc.data(), docRef:doc.ref}));
}

const getObject = async (collectionName, id)=>{
    const response = await firestore.collection(collectionName).doc(id).get()
    return response.data()
}

const getRef = async (collection,uid) =>{
    return db.doc(`${collection}/${uid}`);
}


const getSubCollection = async (collectionName,subCollectionName)=>{
    const response = await firestore.collection(`${collectionName}/${uid}/${subCollectionName}`).get();
    return response.docs.map(doc => ({ id: doc.id, doc: doc.data(), docRef:doc.ref}));
}




module.exports = {
    getAllInCollection,   filterFirestore,getObject,
    getSubCollection,getRef}
