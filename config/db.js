const mongoose = require('mongoose');
const config = require('config');
const db = process.env.MONGO_URI;

//asyn await method
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, 
            useFindAndModify: false
        });
        console.log('mongo db connected');
    } catch (err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;