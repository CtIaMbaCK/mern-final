const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('../config/database');
const router = require('../routes/index');

const app = express();

app.use(cors({
  origin: process.env.FRONT_END_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req, res);
};
