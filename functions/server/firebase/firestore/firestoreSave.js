const admin = require("firebase-admin");
const { Timestamp, FieldValue , updateDoc, getFirestore} = require('firebase-admin/firestore');
const firestore = admin.firestore();

const uploadFireStoreMergeByRef = (ref, data)=> {
    ref.set({...data}, {merge: true}).then(()=>{console.log("done"); return null;})
}

const uploadFireStoreMerge =(collectionId,docId,data)=>{
    firestore
        .collection(collectionId).doc(docId)
        .set({...data},{merge:true})
        .catch(function(error) {
            console.error("Error adding document:", error);
        });
}


const uploadFireStoreMergeField =(collectionId,docId,data, arrFieldNames)=>{
    firestore
        .collection(collectionId).doc(docId)
        .set({...data},{merge:true, mergeFields:arrFieldNames})
        .catch(function(error) {
            console.error("Error adding document:", error);
        });
}
const uploadFireStore =(collectionId,docId,data)=>{
    firestore
        .collection(collectionId)
        .doc(docId)
        .set({...data})
        .catch(function(error) {
            console.error("Error adding document:", error);
        });
}

const bulkSaveArrayOfDocs = async (docsList) => {
    const db = getFirestore();
    const batch = db.batch();
    docsList.forEach((docResult) => batch.update(docResult.docRef, docResult.doc));
    await batch.commit();
}
module.exports =  {uploadFireStoreMergeField, uploadFireStore, uploadFireStoreMerge,uploadFireStoreMergeByRef,
    bulkSaveArrayOfDocs}
