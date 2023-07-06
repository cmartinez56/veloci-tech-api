const Cloud = require('@google-cloud/storage')
const { Storage } = Cloud

const getStorage=() => {


    if (process.env.ENVIRONMENT === 'LOCAL') {
        // const path = require('path')

        //const serviceKey = path.join(__dirname, './SA.json')
        const serviceKey = require('./SA-veloci-tech.json')

        const storage = new Storage({
            keyFilename: serviceKey,
            projectId: 'veloci-tech',
        })
        return storage
    } else {
        const storage = new Storage({
            projectId: 'veloci-tech',
        })
        return storage

    }
}

const storage = getStorage()


module.exports = storage
