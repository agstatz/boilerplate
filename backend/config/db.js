const mongoose = require('mongoose');

const db = 'mongodb+srv://admin:1234@cluster0.ggera.mongodb.net/boilerplate?retryWrites=true&w=majority'

const connectDB = async (callback) => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected');
        callback();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;