import express from 'express';
import { uploadPdf,extractPdf,getExtractedPdfs } from '../controllers/pdf.controller.js';
import verifyUser from '../utils/verify.js';
import multer from 'multer';
import path from 'path'


const router= express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'api/uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
  });
  const upload = multer({ storage });
  


// Upload pdf route
router.post('/upload', verifyUser, upload.single('pdf'), uploadPdf);

// Upload extracted route
router.post('/extract', verifyUser, extractPdf);
router.get('/extract', verifyUser, getExtractedPdfs);




export default router