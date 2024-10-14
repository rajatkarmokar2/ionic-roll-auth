require( 'dotenv' ).config()
const express = require( 'express' );
const mongoose = require( 'mongoose' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const fs = require( 'fs' )
const https = require( 'https' );

const { Register,Login } = require( './controllers/auth' );
const { authMiddleware } = require( './middlewares/authMiddleware' );
const { getUsers,createUser,updateUser,deleteUser } = require( './controllers/users' );
const { getProfile } = require( './controllers/profile' );

const PORT = 5000;
const HOST = '192.168.1.100';
const httpsEnabled = false

// Create Express app
const app = express();

// Middleware
app.use( bodyParser.json() );
app.use( cors( {
    origin: "*",
    credentials: true,
} ) );

app.post( '/register',Register );

app.post( '/login',Login );

app.get( '/profile',authMiddleware,getProfile );

app.get( '/users',authMiddleware,getUsers )
    .post( '/users',authMiddleware,createUser )
    .patch( '/users/:id',authMiddleware,updateUser )
    .delete( '/users/:id',authMiddleware,deleteUser )

// MongoDB connection
mongoose
    .connect( 'mongodb://localhost:27017/authdb',{} )
    .then( () => console.log( 'MongoDB connected' ) )
    .catch( ( err ) => console.log( 'MongoDB connection error:',err.message ) );


// Start the server

var options = {
    key: fs.readFileSync( __dirname + '/ssl/mykey.key','utf8' ),
    cert: fs.readFileSync( __dirname + '/ssl/mycert.crt','utf8' ),
};

if ( httpsEnabled ) {
    https.createServer( options,app ).listen( PORT,HOST,() => {
        console.log( `Server running on https://${HOST}:${PORT}` );
    } );
} else {
    app.listen( PORT,HOST,() => {
        console.log( `Server running on http://${HOST}:${PORT}` );
    } );
}
