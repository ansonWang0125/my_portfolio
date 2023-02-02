const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  googleClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  googleClientSecret: process.env.COOGLE_OAUTH_CLIENT_SECRET,
  googleOauthRedirect: process.env.GOOGLE_OAUTH_REDIRECT_URL
};