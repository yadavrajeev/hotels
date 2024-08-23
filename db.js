const mongoose = require('mongoose');

const mongoURL =  'mongodb://127.0.0.1:27017/hotels';
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("server is connected to database");
});

db.on('error',(err)=>{
    console.log('sever is hampered', err);
});

db.on('disconnected',()=>{
    console.log('sever is disconnected');
});

module.exports = db;    