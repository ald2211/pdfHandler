import axios from 'axios';

const API_URL = 'https://pdfhandler.onrender.com/api/v1/pdf/';

// Function to upload PDF
export const uploadPdf = async (pdf) => { 
    const token = localStorage.getItem('token');
    console.log('here')
    const config = { 
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'  
        } 
    };
    
    const response = await axios.post(API_URL + 'upload', pdf, config);
    return response.data;
};

// Function to extract data from PDF
export const extractPdf = async (pdf) => { 
    const token = localStorage.getItem('token');
    const config = { 
        headers: { Authorization: `Bearer ${token}` },
    };
    
    const response = await axios.post(API_URL + 'extract', pdf, config);
    return response.data;
};

//function to get users extracted pdfs
export const getExtractedPdfs = async (pdf) => { 
    const token = localStorage.getItem('token');
    const config = { 
        headers: { Authorization: `Bearer ${token}` },
    };
    
    const response = await axios.get(API_URL + 'extract',config);
    return response.data;
};
