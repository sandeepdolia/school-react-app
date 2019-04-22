# school-react-app

# frontend

>

## Required installation
- [NodeJS](https://nodejs.org/en/download/)

## Preparations
- Going to the project folder
```cd project_path/```

- Setting up configuration file
    - Open
        - If NODE_ENV variable is updated ```./config/<NODE_ENV>.json```
        - Else ```./config/default.json```
    - General settings
        - ```port``` - port to be used. Default is ```3030```

## Run development
- Installing packages
```npm install```
- Start app
```npm start```

## Running on production
- set up ```NODE_ENV``` environment variable to ```production```
- Installing packages
```npm install -g webpack```
```npm install```
- Compiling for production
- ```npm run build```
- Start app
```npm start```

