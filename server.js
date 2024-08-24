const express = require('express');
const bodyParser = require('body-parser');
const db = require("./db");
const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(bodyParser.json());// req.body

//router is also a middleware so it is use as app.use
//import router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//use the routers
app.use('/person',personRoutes);
app.use('/menuitem', menuItemRoutes);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
});
