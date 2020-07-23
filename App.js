const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const jwt = require('jsonwebtoken');


const login_needed = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'my_secret_key');
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
}


mongoose.connect(process.env.DB, {
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useUnifiedTopology: true});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/videos', express.static('media/uploads'));

// Routes
app.use('/api/signIn', require('./routes/signIn'));
app.use('/api/signUp', require('./routes/signUp'));
app.use('/api/upload', login_needed, require('./routes/upload'));
app.use('/api/videoList', login_needed, require('./routes/videoList'));



const PORT = process.env.PORT || 3333;

const server = http.createServer(app);

server.listen(PORT);