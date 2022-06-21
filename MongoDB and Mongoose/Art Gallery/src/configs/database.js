const mongoose = require('mongoose');
const { constants } = require('./constants');

exports.initializeDatabase = () => mongoose.connect(constants.dbConnectionString);
