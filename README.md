# Pdf Handler

### Pdf Handler Application

[**Live Application Link**](https://pdfhandler.onrender.com/)

This web application allows users to upload a PDF
file and extract certain pages from the PDF to create a new PDF. The user
can able to select which pages they want to include in the new PDF.
## Table of Contents

- [Overview](#overview)
- [Features and Functionalities](#features-and-functionalities)
  - [User Authentication](#1-user-authentication)
  - [Pdf Management](#2-pdf-management)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Clone the Repository](#1-clone-the-repository)
  - [Install Dependencies](#2-install-dependencies)
  - [Set Up Environment Variables](#3-set-up-environment-variables)
  - [Run the Application](#4-run-the-application)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [pdf Management](#pdf-management)
- [Usage](#usage)
- [Live Link](#live-link)
- [Contact](#contact)

## Overview

The **Pdf Handler** is a user-friendly pdf management application that allows users to easily manage their images through features like uploading, editing, deleting, and rearranging. Users can assign titles to their images, perform bulk uploads, and organize their images with drag-and-drop functionality.

## Features and Functionalities

### 1. User Authentication

- **Register**: Users can sign up using their email ID, phone number, and password.
- **Login**: Registered users can log in with their credentials to access the application.

### 2. Pdf Management

- **Upload pdf**:
  - Users can upload pdf.
  - Once the pdf is uploaded, it will display a visual representation of all pages in the PDF.
  
- **Select the required pages**:
  - Users can select which pages they want to extract from the original PDF.

- **Create new pdf**:
  - By clicking the create Pdf buttonUsers can create the new PDF based on the selected pages. Once completed, it will automatically download and user can get the extracted pdf from the downaloads. 
  - The extracted pdf also will be show in the home page where user can also download from there at any time.

## Technologies Used

- **Frontend**: ReactJS.
- **Backend**: Node.js with Express.js.
- **Database**: MongoDB.
- **Authentication**: JWT (JSON Web Token) for user sessions.
- **File Storage**: Google drive Storage for image handling.
- **Pdf viewer**: react-pdf for virtual presentation of each pages in the pdf.
- - **Pdf Handler at backend**: use pdf-lib library to handle the pdf at backend.

## Installation

Follow these steps to set up the application locally.

### 1. Clone the Repository

```bash

# Clone the repository
git clone https://github.com/ald2211/pdfHandler.git
cd pdfHandler-master

```

### 2. Install dependencies

## Backend
npm install

## Frontend
cd frontEnd
npm install

### 3. Set up environment variables

Create a `.env` file in the root folder with the following content:

- **MONGO_URI**: Your MongoDB Atlas URI
- **PORT**: 3000
- **JWT_SECRET**: Your JWT Secret
# Google API Configuration
- **GOOGLE_API_FOLDER_ID**:Your Google API Folder ID
- **GOOGLE_ACCESS_KEY_FILE_PATH**:Path to Your Google Access Key File
- **GOOGLE_ACCOUNT_TYPE**:Your Google Account Type
- **GOOGLE_PROJECT_ID**:Your Google Project ID
- **GOOGLE_PRIVATE_KEY_ID**:Your Google Private Key ID
- **GOOGLE_PRIVATE_KEY**:"Your Google Private Key"  # Make sure to wrap the key in quotes
- **GOOGLE_CLIENT_EMAIL_ID**:Your Google Client Email ID
- **GOOGLE_CLIENT_ID**:Your Google Client ID
- **GOOGLE_AUTH_URI**:Your Google Auth URI
- **TOKEN_URI**:Your Google Token URI
- **AUTH_PROVIDER_URL**:Your Google Auth Provider URL
- **CLIENT_URL**:Your Client URL
- **UNIVERSE_DOMAIN**:Your Universe Domain


### 4. Run the application

>root folder
npm start

## API Endpoints

### User Authentication
- **Register**: `POST /api/v1/auth/register`
- **Login**: `POST /api/v1/auth/login`

### pdf Management
- **Get extracted pdfs**: `GET /api/v1/pdf/extract`
- **Upload pdf**: `POST /api/v1/pdf/upload`
- **Extract pdf**: `POST /api/v1/pdf/extract`


  
## Usage

1. **Register**: Create a new account using your email, phone number, and password.
2. **Login**: Log in with your credentials to access the image management features.
3. **Upload pdf**: 
   - Select the pdf to extract.
   - Use the  upload feature to upload the pdf.
4. **Create new pdf**:
   - Select the required pages by checking the checkbox.
   - click the create Pdf button to create new pdf with selected pages only.



## Live Link

You can access the live version of the application at [Live Application Link](https://pdfhandler.onrender.com/)


## Contact

For any inquiries or support, feel free to reach out via email:

**Email**: [afnadca2@gmail.com](mailto:afnadca2@gmail.com)

