### Prerequisites
-> NODE Version - 16.15.0
-> NPM Version - 8.5.5
-> React Version - 18.1.0


### Steps to set up project in local machine:
-> First download and install latest node version (16.15.1) in local machine from below link:
    https://nodejs.org/en/download/

-> After installation, Clone a project repository at your selected location from dev azure by using below command:
    git clone https://3SC-Solutions@dev.azure.com/3SC-Solutions/SCAI/_git/scai_frontend_starter

-> After complete cloning, go to project directory and install dependencies from package.json file by using command:
### npm i
This will install all the dependencies in project directory.

->After successful installation, you can run project by using command:
### npm start


### Sentry 
We need to add Sentry URL in .env file to get error report on Sentry Dashboard for live error tracking.


### Test cases 
To run test cases, run the below command:
npm test



### Build Flavors
Basically there are three build flavors in this project: Production, UAT, Staging

-> To run project in Production environment:
    First set the Base URL in .env.production file. After that run below command to get build for production server:
    npm run build:production

-> To run project in UAT environment:
    First set the Base URL in .env.uat file. After that run below command to get build for UAT server:
    npm run build:uat

-> To run project in Staging environment:
    First set the Base URL in .env.staging file. After that run below command to get build for Staging server:
    npm run build:staging
    

### Port Number
You can set any PORT number in .env file to change the default port of react application (default is 3000)


### Additional work done 

1. constants -> constant.js -> List of All the literals and constants used in Project 

2. Store -> for Redux (Actions and Reducer)

3. utils -> ApiHandler
         -> cacheHandler
         -> ErrorBoundary
         -> formValidationHandler
         -> added moment-util for date format handling
         -> sessionHandler

