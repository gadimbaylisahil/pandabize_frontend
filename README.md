# Pandabize React

Pandabize is built to serve as a frontend for the PandabizeAPI application built in Ruby on Rails.
App demonstrates basic functionality to create Bicycles with Options which generates list of variants.

You can find DEMO [here](https://pandabize.firebaseapp.com/)

You can find the respository for api [here](https://github.com/gadimbaylisahil/pandabize_api)

### More information:
App contains simple structure with functional and stateful components. 
It uses Redux for state management and `react-router-dom` for Routing. 
Test suite uses Enzyme and Jest.


### Prerequisites

npm

## Installation

Clone the repository and cd to the dir.

```
 npm install
 npm start
```

On development application will send requests to localhost:8081/, 
so it would be better to run your Rails Server at that port.

## Running Tests

```
npm test
```

If you have issues in running tests try running 
`brew install watchman`
