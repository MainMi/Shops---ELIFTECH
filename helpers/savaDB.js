const { MongoTransferer, MongoDBDuplexConnector, LocalFileSystemDuplexConnector } = require('mongodb-snapshot');
const path = require('path');

const { MONGO_URL } = require('../config/config');

async function dumpMongo2Localfile() {
    const mongo_connector = new MongoDBDuplexConnector({
        connection: {
            uri: MONGO_URL,
            dbname: 'webShops',
        },
    });

    const localfile_connector = new LocalFileSystemDuplexConnector({
        connection: {
            path: path.join(__dirname, '..', 'database', 'saveDB', 'save.tar'),
        },
    });

    const transferer = new MongoTransferer({
        source: mongo_connector,
        targets: [localfile_connector],
    });

    for await (const { total, write } of transferer) {
        console.log(`remaining bytes to write: ${total - write}`);
    }
}
async function restoreLocalfile2Mongo() {
    const mongo_connector = new MongoDBDuplexConnector({
        connection: {
            uri: MONGO_URL,
            dbname: 'webShops',
        },
    });

    const localfile_connector = new LocalFileSystemDuplexConnector({
        connection: {
            path: path.join(__dirname, '..', 'database', 'saveDB', 'save.tar'),
        },
    });

    const transferer = new MongoTransferer({
        source: localfile_connector,
        targets: [mongo_connector],
    });

    for await (const { total, write } of transferer) {
        console.log(`remaining bytes to write: ${total - write}`);
    }
}

module.exports = {
    dumpMongo2Localfile,
    restoreLocalfile2Mongo
};
