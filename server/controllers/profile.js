const { User } = require( '../models/user' );

const getProfile = async ( req,res ) => {
    try {
        const user = await User.findById( req.user?.userId ).select( 'email name roll -_id' ); // Exclude password
        res.status( 200 ).json( user );
    } catch ( error ) {
        console.log( error )
        res.status( 200 ).json( { message: "User not found" } );
    }
}

module.exports = { getProfile }