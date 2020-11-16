# MacOsReact ([live view](https://afternoon-reef-06568.herokuapp.com/))

This is a small collection of macos-apps mockups that I created while learning node-JS and react-JS (credits and thanks to FreeCodeCamp). Since the different parts of this project were not made in the same time (in terms of my learning curve), some of them may seem less 'complete/optimized' than others. The goal is not a pixel-perfect clone but just a way to practice.

## Local testing

The project is divided into two parts, the server that handle basic backend, mongoDB access and routing; and the client where the react frontend is implemented. To run the application locally, clone this repository and run `npm install` both in the main directory and in the client directory. Once the package installation is done, run `npm run dev` which will use [concurrently](https://www.npmjs.com/package/concurrently) which will run and watch for modifications in the client and the server simultaneously.

### Environment variables

- Some of the applications need an access to mongoDB database. After creating a mongoDB cluster, assign the connection string to the variable `dbURI` in `.env` (create the file if not already present) of the main directory.

- You will also need to assign a value for the variable `jwtSecret` in `.env` which is needed by [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) used for generating web tokens.

- There are also two environment variables needed on the frontend which are the api keys used for the weather and the stock applications. For the weather, the one which is used here is from [openweathermap](https://openweathermap.org/api), and for the stock from [alphavintage](https://www.alphavantage.co/). Both have free plans. They should be assigned respectively to `REACT_APP_WEATHER_API_KEY` and `REACT_APP_STOCK_API_KEY` in the `.env` file inside the client directory.

## Used apis

- Weather: [openweathermap](https://openweathermap.org/api)
- Dictionary: [(unofficial) Google Dictionary API
  ](https://dictionaryapi.dev/)
- Stock: [alphavintage](https://www.alphavantage.co/)
