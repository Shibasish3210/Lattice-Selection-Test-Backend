import mongoose from "mongoose";



const connectToMongoDB = (URI)=>{
    mongoose.connect(URI)
    .then(()=>{
        console.log('Connected To Mongo DB');
    })
    .catch((error)=>{
        console.log(error)
    });
}

const Schema = mongoose.Schema;
const model = mongoose.model;
const ID = mongoose.Schema.Types.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

export default connectToMongoDB;
export { Schema, model, ID, ObjectId };