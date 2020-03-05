# Simple Node JWT

Simple JWT Authentication Server

- [Simple Node JWT](#simple-node-jwt)
  - [Setup](#setup)
  - [Install Dependencies](#install-dependencies)
  - [Quick Start](#quick-start)
  - [End Points Examples](#end-points-examples)
  - [App Info](#app-info)
    - [Author](#author)
    - [Version](#version)
    - [License](#license)

## Setup

Create **.env** file with your configuration keys to "configuration/.env" like **.env.example**

```bash
httpPort=<Port Number>
jwtSecret='your jwt secret password'
```

## Install Dependencies

```bash
npm install
```

## Quick Start

```bash
# production mode
npm start

# development mode
npm run dev
```

## End Points Examples

- Server Welcome Message

  GET `/`

- Get Signed JWT Token For Mock User

  POST `/login`

- Verify JWT Token And Return Payload Data

  POST `/verify`

  ```http
  Headers :
    Authorization: <access_token>
  ```

## App Info

### Author

[Technology-Geek](https://github.com/Technology-Geek)

### Version

1.0.0

### License

This project is licensed under the **MIT License**
