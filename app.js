const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const connectDb = require('./db/db');

const controller = require('./controller');
const isAuth = require('./Middleware/isAuth');
const route = require('./Routes/Routes');


connectDb();

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/donation',
    collection: "mySessions",
});

app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
);


app.use(express.urlencoded({ extended: true }));
app.use('/',route);



app.listen(process.env.PORT,()=>{
    console.log(`App is runnning on http://localhost:${process.env.PORT}`)
});