import express from 'express';

const app = express();
const Route = express.Router;

//Global Middlewares
app.use(express.json({ limit: '16kb' })); // middleware to parse JSON values
app.use(express.urlencoded({ extended: true, limit: '16kb' })); // middleware to parse form data



export { app, Route };