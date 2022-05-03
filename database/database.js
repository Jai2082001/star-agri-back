const mongoDb = require('mongodb');
const mongoose = require('mongoose')
const mongoClient = mongoDb.MongoClient;


let db;

const mongoConnect = (callback) => {
    mongoose.connect('mongodb://localhost:27017/seedDtabase'
        , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    db = mongoose.connection;

    db.on('error', () => {
        console.log('some error has occured')   
    }) 
    // lets see
    db.once('open', () => {
        console.log('connected database')
        callback()
    })

}

const getDb = () => {
    if (db) {
        return db
    } else {
        console.log('Database Middle is not initialized');
    }
}

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;









// Bags and Car Racks
// Bells and Horns
// Bottles and Bottle Cages
// Components and Spares
// GPS and Cyclocomputers
// Lights
// Locks
// Maintenance and Care
// Mudguards and Protection
// Others
// Pumps
// Stands
// Tires & Tubes
// Tools
// Trainers
// Wheels




// For Rider
// Backpacks
// Compression and Inner Wear
// Eyewear
// Face Masks
// Footwear
// Gloves
// Helmets
// Jerseys
// Recovery and Body Care
// Shorts
// T-shirts