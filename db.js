const mongoose = require('mongoose');

require('dotenv').config();


// const mongoURL =  MongoDN_URL_LOCAL
const mongoURL = process.env.MongoDB_URL;
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