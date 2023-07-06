const util = require('util')
const gc = require('./gsConnection')
const bucket = gc.bucket('kabila-349106.appspot.com')

const { format } = util

const uploadImage = (file, guid) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file

    const blob = bucket.file(guid+originalname.substring(originalname.lastIndexOf('.')))
    const blobStream = blob.createWriteStream({
        resumable: false
    })
    console.log("Saving image source")

    blobStream.on('finish', () => {
        const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        )
        resolve({imageURL:publicUrl,id:blob.name})
    })
        .on('error', () => {
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)

})



module.exports = {uploadImage, sendImage}
