PDQ Admin Web App 
=====================

This is the web interface for PDQ.

It displays data collected by the PDQ mobile chat application (alpha)

This web app is grouped with the PDQ Queuing Server and PDQ mobile chat application 

## Stack

- React
  - [X] React `15.1.0`
  - [X] React Hot Loader `3.0.0-beta.2`
  - [X] React Router `2.4.1`
- Redux
  - [X] Redux `3.5.2`
  - [X] React Redux `4.4.5`
  - [X] React Router Redux `4.0.4`
  - [X] Redux Thunk `2.1.0`
  - [X] Redux Dev Tools
- Webpack    
  - [X] Webpack `1.13.1`
  - [X] Webpack Dev Middleware `1.6.1`
  - [X] Webpack Hot Middleware `2.10.0`
- Firebase
  - [X] Firebase `3.0.3`
- Linting
  - [X] Eslint `2.11.1`
- Styles
  - [X] Bootstrap `3.3.6`
- Testing
  - [X] Mocha `2.5.3`
  - [X] Enzyme `2.3.0`


## Features

- Firebase:
  - Auth
    - [X] Authentication setup (Registration/Login) 
    - [X] state.user sync with Firebase Auth
    - [X] Protected routes (needs to be logged in)    
    - [X] Store users on `'/users/<user.uid>'`
    - [X] Admin flag on user (`'/isAdmin/<user.uid>' :: bool`)
    - [X] Admin Protected routes (needs to be logged in)
  - Database
    - [X] Set example
    - [X] Query example 

## Development Tasks

- `npm start` run the web app with lint and tests in watch mode
- `npm run lint` linting javascript code usig eslint
- `npm run test` test using mocha and enzyme