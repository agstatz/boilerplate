const mongoose = require('mongoose');

// Database URI. Store in environment variable later.
const db = 'mongodb+srv://admin:1234@cluster0.ggera.mongodb.net/boilerplate?retryWrites=true&w=majority'
// const db = 'mongodb://localhost:27017/boilerplate'

const connectDB = async (onConnect) => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected');
        if(onConnect) onConnect();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;