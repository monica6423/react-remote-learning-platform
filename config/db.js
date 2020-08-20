const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//asyn await method
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, 
            useFindAndModify: false
        });
        console.log('mongo db connte');
    } catch (err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;