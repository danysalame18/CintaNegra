const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    airline: {
        type: String,
        require: true
    },
    model: String,
    origin: {
        type: String,
        require: true
    },
    ticket_price: Number
});
const Flights = mongoose.model('Flights', flightSchema)
module.exports = Flights;