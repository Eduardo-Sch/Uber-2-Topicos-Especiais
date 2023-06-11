const mongoose = require('mongoose');
const CorridaSchema = require('./schemas/CorridaSchema');
module.exports = mongoose.model('corrida', CorridaSchema);