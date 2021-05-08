const mongoose = require('mongoose');


const promotion = mongoose.Schema({

}, { strict: false });
module.exports = mongoose.model('pomotion', promotion);
