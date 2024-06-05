const mongoose = require('mongoose');
const config = require('config');
const db = "mongodb+srv://monica6423:vVTm1TbTeEibMZDh@connector.npkfemv.mongodb.net/?retryWrites=true&w=majority&appName=Connector";

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