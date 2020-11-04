const express = require( 'express' );
const bodyParser = require( 'body-parser');
const cookieParser = require( 'cookie-parser');
const compress = require( 'compression');
const cors = require( 'cors');
const helmet = require( 'helmet');
const routes =require("./routes")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// routes
app.use('/',routes);

module.exports = app;
