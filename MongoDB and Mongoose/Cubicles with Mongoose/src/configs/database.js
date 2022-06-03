const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/cubicles';

exports.initializeDatabase = () => mongoose.connect(connectionString);