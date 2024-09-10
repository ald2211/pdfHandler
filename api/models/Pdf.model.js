import mongoose from "mongoose";

const PdfSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  }
},{timestamps:true});

export default mongoose.model('Pdf', PdfSchema);
