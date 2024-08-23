const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    age:{
        type : Number,
        required : true
    },
    work:{
        type : String,
        required : true,
        enum : ['chef','waiter','manager','reception']
        //enum is use to calculate date by defined words only
    },
    mobile:{
        type : Number,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    address:{
        type : String,
        required: true
    },
    salary:{
        type : Number,
        required : true
    }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;