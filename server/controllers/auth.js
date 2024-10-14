const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const { User } = require( '../models/user' );

const Register = async ( req,res ) => {
    const { name,email,password } = req.body;
    console.log( 'Register request received:',req.body );
    // Check if user already exists
    let user = await User.findOne( { email } );
    if ( user ) {
        return res.status( 400 ).json( { message: 'User already exists' } );
    }

    // Create new user
    user = new User( {
        name,
        email,
        password: await bcrypt.hash( password,10 ), // Hash password
    } );

    // Save user in the database
    await user.save();

    // Generate JWT token
    const token = jwt.sign( { userId: user._id },process.env.JWT_SECRET,{ expiresIn: '1h' } );

    res.status( 201 ).json( { token,name,email,roll: user.roll } );
}

const Login = async ( req,res ) => {
    const { email,password } = req.body;

    // Check if user exists
    let user = await User.findOne( { email } );
    if ( !user ) {
        return res.status( 400 ).json( { message: 'Invalid email or password' } );
    }

    // Validate password
    const isMatch = await bcrypt.compare( password,user.password );
    if ( !isMatch ) {
        return res.status( 400 ).json( { message: 'Invalid email or password' } );
    }

    // Generate JWT token
    const token = jwt.sign( { userId: user._id },process.env.JWT_SECRET,{ expiresIn: '1h' } );

    res.json( { token,name: user.name,email,roll: user.roll } );
}

module.exports = { Register,Login }