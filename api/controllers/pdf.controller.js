import { errorHandler } from '../utils/customError.js';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { uploadToStorage } from '../utils/uploadToStorage.js';
import PdfModel from '../models/Pdf.model.js';



const __dirname = path.resolve()


export const uploadPdf = async (req, res, next) => {

  try {

    if (!req.file) {
      return errorHandler(400,'No file uploaded.')
    }
    console.log('file:',req.file)
    const filePath = path.join(__dirname, req.file.path);
    const data = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(data);
    const numPages = pdfDoc.getPageCount();
   
  
    res.json({ filePath:`https://pdfhandler.onrender.com/uploads/${req.file.filename}`,actualPath:req.file.path, numPages });

  } catch (error) {
    console.error('Error during pdf upload:', error.message);
    next(errorHandler(500, `Server error: ${error.message}`));
  }
};

export const extractPdf = async (req, res, next) => {
  
  const { user } = req;
  const { pages, filePath } = req.body;
  console.log('path:',filePath)
  try {
  const data = fs.readFileSync(path.join(__dirname, filePath));
  const originalPdf = await PDFDocument.load(data);
  const newPdf = await PDFDocument.create();

  for (let pageIndex of pages) {
    const [copiedPage] = await newPdf.copyPages(originalPdf, [pageIndex - 1]);
    newPdf.addPage(copiedPage);
  }

  const pdfBytes = await newPdf.save();
  const fileBuffer = Buffer.from(pdfBytes);
    const uploadedPdfUrl = await uploadToStorage(fileBuffer, 'extracted.pdf'); 
    const newPdfEntry = new PdfModel({
      user: user.id,
      pdfUrl: uploadedPdfUrl, 
    });
    await newPdfEntry.save();
    console.log('urlll:',uploadedPdfUrl)
    res.status(201).json({
      success: true,
      message: 'PDF extracted and uploaded successfully',
      pdfUrl: uploadedPdfUrl,
    });
  } catch (error) {
    console.error('Error during pdf extraction', error.message);
    next(errorHandler(500, `Server error: ${error.message}`));
  }
};

export const getExtractedPdfs=async(req,res,next)=>{

  const { user } = req;

  const userPdfs= await PdfModel.find({user:user.id})
  if(!userPdfs||userPdfs.length===0)return next(errorHandler('404','user not existed'))

    res.status(200).json({pdfs:userPdfs})

}

