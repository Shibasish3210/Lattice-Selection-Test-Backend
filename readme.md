# Project Name

## Psychiatry Platform

### Overview

This project aims to provide a comprehensive platform for psychiatrists to manage their patients through a mobile/web portal. Psychiatrists can register their patients, and each psychiatrist is associated with a specific hospital. The system ensures clarity in managing patient records and streamlining hospital affiliations.

### Features

- **Register Patient**: API endpoint to register a new patient.
- **Register Doctor**: API endpoint to register a new doctor.
- **Register Hospital**: API endpoint to register a new hospital.
- **Hospital Details**: Retrieve detailed information about a specific hospital.
- **Doctors List**: Retrieve a list of psychiatrists.
- **Patients List**: Obtain a list of registered patients.
- **Hospitals List**: Access a predefined list of hospitals.

### Technologies Used

- **Backend**: Express.js and Node.js
- **Database**: MongoDB
- **Image Upload**: Multer for handling file uploads, Cloudinary for cloud-based image storage.
- **Validation**: Validator package for input validation.

### Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/Shibasish3210/Lattice-Selection-Test-Backend
    ```

2. Install dependencies:

    ```bash
    cd Lattice-Selection-Test-Backend
    npm install
    ```

3. Configure Environment Variables:

    Create a `.env` file in the root directory and set the following variables:

    ```env
    PORT = 5555
    SALT = 11
    Mongo_URI = your_mongodb_uri
    Cloud_Name = your_cloudinary_clould_name
    Api_Key = your_cloudinary_api_key
    Api_Secret = your_cloudinary_api_secret
    ```

4. Run the application:

    ```bash
    npm start
    ```

### API Endpoints

- **POST /register-patient**: Register a new patient.
- **POST /register-doctor**: Register a new psychiatrist.
- **POST /register-hospital**: Register a new hospital.
- **GET /hospital**: Get details of a specific hospital.
- **GET /doctors**: Get the list of psychiatrists.
- **GET /patients**: Get the list of registered patients.
- **GET /hospitals**: Get the predefined list of hospitals.

### Sample Usage

#### Get A Hospital Details with Hospital Id

```bash
    https://lattice-selection-backend.onrender.com/hospital?hospital_id=65ae8b5bd4161f2ad9a62800
```
**N.B. :** this endpoint is a **GET** request and just needs a hospital id in query

#### Register a Patient

```bash
    https://lattice-selection-backend.onrender.com/register-patient
```
**N.B. :** This endpoint is a **POST** request and needs following details of the patient:
    ***Name***, 
    ***Address*** (not less than 10 characters), 
    ***Email*** (valid), 
    ***PhoneNumber*** (optional), 
    ***Password*** (one uppercase & lowercase letter along with a digit between 8-15characters), 
    ***DoctorId*** (valid doctor id under whom the patient is registering)


#### Register a Doctor

```bash
    https://lattice-selection-backend.onrender.com/register-doctor
```
**N.B. :** This endpoint is a **POST** request and needs following details:
    ***doctor_name***,
    ***hospital_id***

#### Register a Hospital

```bash
    https://lattice-selection-backend.onrender.com/register-hospital
```
**N.B. :** This endpoint is a **POST** request and needs just ***hospital_name*** field

#### Get Hospital Details

```bash
    https://lattice-selection-backend.onrender.com/hospital?hospitals
```
**N.B. :** this endpoint is a **GET** request and does not need any parameters


#### Get Doctor Details

```bash
    https://lattice-selection-backend.onrender.com/hospital?doctors
```
**N.B. :** this endpoint is a **GET** request and does not need any parameters


#### Get Patients List 

```bash
    https://lattice-selection-backend.onrender.com/patients
```
**N.B. :** this endpoint is a **GET** request and does not need any parameters


### Conclusion

This platform provides a seamless experience for psychiatrists to manage their patients and hospitals efficiently. The combination of Express.js, Node.js, MongoDB, Multer, and Cloudinary ensures a robust and scalable solution. Feel free to explore the API endpoints and integrate this platform into your healthcare system. The endpoint for patient registration and retrieving particular hospital data is ready with edge cases but the rest of the endpoints need right data which can be updated later. [Click here](https://github.com/Shibasish3210/Lattice-Selection-Test-Backend/blob/master/Lattice%20Selection%20Test%20Collection.postman_collection.json) to get the postman collection for efficient usage and parameters.For any inquiries or issues, please contact [Shibasish Mondal](shibasish3210@gmail.com) .

---

Note: Replace placeholders like  `[your_mongodb_uri]`, `[your_cloudinary_api_key]`, `[your_cloudinary_api_secret]`, and `[your_cloudinary_clould_name]` with your actual information.