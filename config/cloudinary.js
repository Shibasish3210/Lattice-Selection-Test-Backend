import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.Cloud_Name, 
    api_key: process.env.Api_Key, 
    api_secret: process.env.Api_Secret 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        // file has been uploaded successfull
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log(error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary};