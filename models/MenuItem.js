const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        required: true,
        enum:['sweet','sour','spicy']
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingerdients: {
        type: [String],
        default: []
    },
    num_sales:{
        type: Number,
        default: 0
    }

});

const MenuItem = mongoose.model( 'MenuItem', menuItemSchema);
module.exports = MenuItem;