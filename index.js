const express= require("express");
const app=express();
const mongoose= require("mongoose");
const {MONGO_URL}= require('./config');
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const postRoute=require("./routes/posts");
const bodyParser= require('body-parser');

//BodyParser Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))


//connect to MongoDB
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then (() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

    const db = mongoose.connection
    const quotesCollection = db.collection('posts')

    db.once('open', _ => {
      console.log('Database connected:', MONGO_URL)
    })
    
    db.on('error', err => {
      console.error('connection error:', err)
    })


app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
  quotesCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
})


app.use("/UTeM/auth", authRoute);
app.use("/UTeM/users", userRoute);
app.use("/UTeM/posts", postRoute);


const PORT= process.env.PORT || 3000;
app.listen (PORT, () => console.log(`Running on port ${PORT}...`));
