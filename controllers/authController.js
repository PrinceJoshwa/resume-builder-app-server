// const { OAuth2Client } = require('google-auth-library');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const axios = require('axios');

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// exports.googleLogin = async (req, res) => {
//   const { token } = req.body;

//   if (!token) {
//     return res.status(400).json({ msg: 'Token is required' });
//   }

//   try {
//     console.log('Attempting to verify token:', token);
    
//     // Use the access token to get user info from Google
//     const googleUserInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     const { sub, email, name, picture } = googleUserInfo.data;
//     console.log('User info retrieved:', { sub, email, name });

//     let user = await User.findOne({ googleId: sub });

//     if (!user) {
//       user = new User({
//         googleId: sub,
//         email,
//         name,
//         picture,
//       });
//       await user.save();
//       console.log('New user created:', user);
//     } else {
//       console.log('Existing user found:', user);
//     }

//     const jwtToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({ token: jwtToken, user });
//   } catch (error) {
//     console.error('Google login error:', error);
//     res.status(500).json({ msg: 'Server error', error: error.message });
//   }
// };


const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ msg: 'Token is required' });
  }

  try {
    // Use the access token to get user info from Google
    const googleUserInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { sub, email, name, picture } = googleUserInfo.data;

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = new User({
        googleId: sub,
        email,
        name,
        picture,
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
