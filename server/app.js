const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();

// Mongo URI
const mongoURI = 'mongodb+srv://sean:'+ process.env.MONGO_ATLAS_PW + '@scout-iszaz.mongodb.net/test?retryWrites=true';

// Routers
const fileRoutes = require('./routes/files');
const userRoutes = require('./routes/users');

// Setup Mongoose
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/files', fileRoutes);

module.exports = app;