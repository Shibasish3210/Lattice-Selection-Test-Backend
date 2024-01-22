import dotenv from 'dotenv';
dotenv.config({
    path: './.env',
});

import { app } from './config/app.js';
import connectToMongoDB from './config/db.js';
import registrationRoute from './routes/registrationRoute.js';
import readDetailsRoute from './routes/readDetailsRoute.js';
import errorLogger from './middleware/errorLogger.js';
import errorHandler from './middleware/errorHandler.js';


//env variables
const PORT = +process.env.PORT || 3333;
const URI = process.env.Mongo_URI;

connectToMongoDB(URI); //connecting to MongoDB


app.use(registrationRoute);//route for registration
app.use(readDetailsRoute);//route for reading details
app.use(errorLogger);
app.use(errorHandler);


//server listening on the given PORT 
app.listen(PORT,()=>{
    console.log(`Server is up and running on http://localhost:${PORT}`);
});