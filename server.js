/*****************
 * @Dependencies *
 *****************/

//Web Framework
const express = require('express');
//Json Web Token
const jwt = require('jsonwebtoken');
//Configuration Keys
const { httpPort, jwtSecret } = require('./configuration/config');

/***************************
 * @InitializeDependencies *
 ***************************/

//Initialize Express App
const app = express();

/***************
 * @Middleware *
 ***************/

//Json Body Parser
app.use(express.json());

//Token Header
// Authorization: <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const authorizationHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof authorizationHeader !== 'undefined') {
    req.token = authorizationHeader;
    // Next middleware
    next();
  } else {
    //!Error Code 403 Forbidden
    res.sendStatus(403);
  }
}

/***********
 * @Routes *
 ***********/

/**
 * Server Welcome Message
 *
 * @Access Public
 * @Response :
 * * Status : 200 OK
 * * Data: json( { message: 'Welcome to JWT Server' } )
 * @Examples :
 * * GET * http://localhost:7000/
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to JWT Server'
  });
});

/**
 * Login / Sign Token
 *
 * @Access Public
 * @Response :
 * * Status : 200 OK
 * * Data: json( { Signed Token } )
 * @Examples :
 * * POST * http://localhost:7000/login
 */
app.post('/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'Test',
    email: 'test@test.com'
  };
  //Generate User Token With User Info As Payload Expires In 1min
  jwt.sign({ user }, jwtSecret, { expiresIn: '1m' }, (err, token) => {
    if (err) {
      console.log(err);
    }
    //Send Token
    else
      res.status(200).json({
        token
      });
  });
});

/**
 * Token Verify
 *
 * @Access Protected
 * @Middleware :
 * * verifyToken
 * @Response :
 * * Status : 200 OK
 * * Data: json( { Token Payload } )
 * @Errors :
 * * ! Code 403 Forbidden
 * @Examples :
 * * POST * http://localhost:7000/verify
 * * * Headers :
 * * * * Authorization : <JWT Token>
 */
app.post('/verify', verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecret, (err, payload) => {
    if (err) {
      //!Error Code 403 Forbidden
      res.sendStatus(403);
    }
    //Send Token Payload
    else
      res.json({
        message: 'Token Verified...',
        payload
      });
  });
});

/***************
 * @Middleware *
 ***************/

//Not Found Handler
app.use((req, res) => {
  //! Error Code 404 Not Found
  res.status(404).json({ message: 'Not Found' });
});

//Server Listener
app.listen(httpPort, () => {
  console.log(`Server running on port ${httpPort}`);
  console.log('********************* Server Ready *********************');
});
