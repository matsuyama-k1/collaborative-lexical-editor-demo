# how to start
## Installation
To install all necessary dependencies, run:
```
npm run install:all
```
If you have not installed Redis, please install Redis too.
https://redis.io/docs/install/install-redis
## Running the Application
To start the application, execute the following commands:
```
npm run start:db
npm run start:frontend
npm run start:backend
```
Access the frontend by navigating to http://localhost:3000/. __Upon pressing enter, you may notice that the backend crashes.__ This is likely due to the complexity of running two instances of Yjs on the same local environment.

To resolve this, simply restart the backend after your initial connection to the frontend:
```
// Restart the backend after the first connection to the frontend.
npm run start:backend
```

## Technical article (Japanese)
https://qiita.com/kanta_matsu/items/958f0c69c858f504188a

