const admin = require("firebase-admin");
require('../firebaseConnection')
const { Timestamp, FieldValue , updateDoc, getFirestore} = require('firebase-admin/firestore');
const db = getFirestore();

const deleteSuggestedCandidates = async (docList)=>{
   return await bulkDelete(docList)
}
const bulkDelete = async (docsList) => {
   const batch = db.batch();
   docsList.forEach((doc) =>  batch.delete(doc.docRef))
   await batch.commit();
}
const deleteFireStoreField =async (collectionId,docId,field)=>{
   await db
       .collection(collectionId).doc(docId).update({
          [field]: FieldValue.delete()
       });
}
const deleteDocByRef = async (docRef)=>{
   docRef.delete()
}
module.exports = {deleteSuggestedCandidates,deleteFireStoreField,deleteDocByRef}
