import { google } from 'googleapis';
import { v4 as uuidv4 } from 'uuid';
import { PassThrough } from 'stream';
import { keys } from '../keys.js';


// Function to upload the file
export const uploadToStorage = async (fileBuffer, fileName) => {
  try {
    // Authenticate using a service account key
     //process.env.GOOGLE_ACCESS_KEY_FILE_PATH
    const auth = new google.auth.GoogleAuth({
      credentials:keys, // Make sure this points to your actual key file
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const driveService = google.drive({
      version: 'v3',
      auth,
    });

    // File metadata
    const fileMetaData = {
      name: `${uuidv4()}-${fileName}`, // Unique file name
      parents: [process.env.GOOGLE_API_FOLDER_ID], // Replace with your Google Drive folder ID
    };

    // Convert Buffer to Readable Stream
    const bufferStream = new PassThrough();
    bufferStream.end(fileBuffer); // Pass the buffer data to the stream

    // Media (file content)
    const media = {
      mimeType: 'application/pdf', // Replace with the actual file's MIME type
      body: bufferStream, // Provide the readable stream
    };

    // Upload the file
    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      fields: 'id', // Get file ID
    });

    const fileId = response.data.id;

    // Make the file public
    await driveService.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Generate the direct download URL
    const fileUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;
   
    return fileUrl; // Return the download URL
  } catch (error) {
    console.error('Error uploading to Google Drive', error);
    throw error;
  }
};
