const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const items = require("./routes/api/items");
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const  app = express();

//BodyParser Middleware
app.use(express.json());

//DB config
const db = config.get('mongoURI');

// Connect to mongoDB
mongoose
    .connect(db,{
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .then(()=>{console.log("MongoDB is connecting...")})
    .catch(err =>{console.log(err)});

//Use Routes
app.use('/api/items',items);
app.use('/api/users',users);
app.use('/api/auth',auth);

//use to build to product
/*if(process.env.NODE_EVN === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}*/
const port = process.env.PORT || 5000;

app.listen(port , ()=> console.log(`Server started on port  ${port}` ));

