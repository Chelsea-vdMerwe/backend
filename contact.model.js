const mongoose =require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
    contact_fullname: {
        type: String
    },
    contact_address: {
        type: String
    },
    contact_mobile_phone: {
        type: Number
    },
    contact_telephone: {
        type: Number
    },
    contact_city: {
        type: String
    },
    contact_postal_code :{
        type: String
    },
    contact_country: {
        type:String
    }
});

module.exports = mongoose.model('Contact', Contact);