const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

// Route files
const bootcamps = require('./routes/bootcamps');

// load env file
dotenv.config({path: './config/config.env'});


// Connect to Database
connectDB();

const app = express();

// Body parser
app.use(express.json())

// DEv logging middleware
if(process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

app.use(logger);

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server and exit process
    server.close(() => process.exit(1));
});