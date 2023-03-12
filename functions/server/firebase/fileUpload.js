// noinspection SpellCheckingInspection
const { format } = require("util");
const busboyConfig = require("busboy");
const os = require("os");
const path = require('path')
const fs = require('fs');

const gc = require("./gsConnection");
const bucket = gc.bucket('veloci-tech.appspot.com')

exports.sendImage = (file, guid) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file

    const blob = bucket.file(`adminImages/${guid+originalname.filename.substring(originalname.filename.lastIndexOf('.'))}`);
    const blobStream = blob.createWriteStream({
        resumable: false
    })
    console.log("Saving image source")

    blobStream.on('finish', () => {


        const publicUrl = format(
        `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`
        )
        resolve({imageURL:publicUrl,id:blob.name});
    }).on('error', () => {
            reject(`Unable to upload image, something went wrong`)
        }).end(buffer)
});

exports.filesUpload = function (req, res, next) {
    // See https://cloud.google.com/functions/docs/writing/http#multipart_data
    const busboy = busboyConfig({
        headers: req.headers,
        limits: {
            // Cloud functions impose this restriction anyway
            fileSize: 10 * 1024 * 1024,
        },
    });

    const fields = {};
    const files = [];
    const fileWrites = [];
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    const tmpdir = os.tmpdir();

    busboy.on("field", (key, value) => {
        // You could do additional deserialization logic here, values will just be
        // strings
        fields[key] = value;
    });

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        const filepath = path.join(tmpdir, filename.filename);
        console.log(
            `Handling file upload field ${fieldname}: ${filename} (${filepath})`
        );
        const writeStream = fs.createWriteStream(filepath);
        file.pipe(writeStream);

        fileWrites.push(
            new Promise((resolve, reject) => {
                file.on("end", () => writeStream.end());
                writeStream.on("finish", () => {
                    fs.readFile(filepath, (err, buffer) => {
                        const size = Buffer.byteLength(buffer);
                        console.log(`${filename} is ${size} bytes`);
                        if (err) {
                            return reject(err);
                        }

                        files.push({
                            fieldname,
                            originalname: filename,
                            encoding,
                            mimetype,
                            buffer,
                            size,
                        });

                        try {
                            fs.unlinkSync(filepath);
                        } catch (error) {
                            return reject(error);
                        }

                        resolve();
                    });
                });
                writeStream.on("error", reject);
            })
        );
    });

    busboy.on("finish", () => {
        Promise.all(fileWrites)
            .then(() => {
                req.body = fields;
                req.files = files;
                next();
            })
            .catch(next);
    });

    busboy.end(req.rawBody);
};