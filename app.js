const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const connectDb = require('./db/db');

const controller = require('./controller')
const isAuth = require('./Middleware/isAuth')

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

app.get('/allCreators',controller.allCreator);

app.post('/register',controller.register_post);
app.get('/register',(req,res)=>{res.send('Register page!')});

app.post('/login',controller.login_post);
app.get('/login',(req,res)=>{res.send('Login page!')});

app.post('/donation',isAuth , controller.donation);
app.get('/donation',isAuth , (req,res)=>{res.send('Donation screen')});


app.get('/particularDonations/',isAuth,controller.particularDonations);
app.post('/logout', controller.logout);


app.listen(5000,()=>{
    console.log('App is runnning on http://localhost:5000')
});