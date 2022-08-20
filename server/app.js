const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const connectDB  = require('./config/db');
require('dotenv').config();
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/userRoute'));
app.use('/api/products', require('./routes/productRoute'));
app.use('/api/cart', require('./routes/cartRoute'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  }); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
  connectDB();
  console.log(`🚀 @ http://localhost:${PORT}`)
});
