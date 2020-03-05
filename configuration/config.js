/*****************
 * @Dependencies *
 *****************/

//Environment Variable Manager
const dotenv = require('dotenv');

/***************************
 * @InitializeDependencies *
 ***************************/

//Initialize dotenv with configuration file path
dotenv.config({ path: 'configuration/.env' });

console.log('********************* Environment Ready *********************');

/***********************
 * @ConfigurationSetUp *
 ***********************/

//Configuration Object
const config = {
  env: process.env.NODE_ENV || 'development',
  httpPort: process.env.PORT || process.env.httpPort,
  jwtSecret: process.env.jwtSecret
};

/************
 * @Exports *
 ************/

//Configuration Object
module.exports = config;
