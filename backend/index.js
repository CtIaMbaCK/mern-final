const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

require('dotenv').config();
const connectDB = require('./config/database');
const router = require('./routes/index.js');


const app = express();


app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 8080;


module.exports = async (req, res) => {
    if (!app.dbConnected) {
        await connectDB();
        app.dbConnected = true;
    }
    return app(req, res);
};