const {uploadFireStoreMerge} = require("../server/firebase/firestore/firestoreSave");

const { Timestamp, FieldValue, getFirestore} = require('firebase-admin/firestore');


const onUpdateUser = async (change, context) =>{
    const newValue = change.after.data();

    // ...or the previous value before this update
    const previousValue = change.before.data();


    if(previousValue.profileConfigured !== newValue.profileConfigured){
        if(previousValue.profileConfigured === false){
            //user is now configured


        }
    }


}

const onCreateUser= async (change, context)=>{
       await uploadFireStoreMerge(`kabilaUsers`,context.params.docId, {profileConfigured:false})
}

module.exports = {onCreateUser,onUpdateUser}