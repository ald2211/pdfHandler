import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { PdfSchema } from '../schemas';
import { extractPdf, uploadPdf, getExtractedPdfs } from '../services/uploadService';
import { Failed } from '../helpers/popup';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import ExtractPdfs from './ExtractPdfs'; // Import the ExtractPdfs component

// Configure the worker using the UMD version
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfUploader = () => {
    const [file, setFile] = useState(null);
    const [pdfData, setPdfData] = useState(null);
    const [selectedPages, setSelectedPages] = useState([]);
    const [isDownloading, setIsDownloading] = useState(false);
    const [extractedPdfs, setExtractedPdfs] = useState([]);

    const formik = useFormik({
        initialValues: {
            pdf: null,
        },
        validationSchema: PdfSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('pdf', values.pdf);
            try {
                const res = await uploadPdf(formData);
                setPdfData(res);
            } catch (error) {
                Failed(error.message);
                console.error('Error uploading PDF', error);
            } finally {
                formik.resetForm();
            }
        },
    });

    const handlePageSelection = (pageIndex) => {
        setSelectedPages((prev) =>
            prev.includes(pageIndex)
                ? prev.filter((p) => p !== pageIndex)
                : [...prev, pageIndex]
        );
    };

    const handleDownload = async () => {
        try {
            setIsDownloading(true);

            const res = await extractPdf({ pages: selectedPages, filePath: pdfData.actualPath });
            const { pdfUrl } = res;

            const a = document.createElement('a');
            a.href = pdfUrl;
            document.body.appendChild(a);
            a.click();
            a.remove();

            setExtractedPdfs((prev) => [
                ...prev,
                res
            ]);
            setPdfData(null);
            setSelectedPages([]);
        } catch (error) {
            console.error('Error creating PDF', error);
        } finally {
            setIsDownloading(false);
        }
    };

    useEffect(() => {
        if (!pdfData) {
            setFile(null);
        }
    }, [pdfData]);

    useEffect(() => {
        const fetchExtractedPdfs = async () => {
            try {
                const res = await getExtractedPdfs();
                setExtractedPdfs(res.pdfs);
            } catch (error) {
                console.error('Error fetching extracted PDFs', error);
            }
        };

        fetchExtractedPdfs();
    }, []);

    return (
        <div className="container mx-auto p-4 pt-[118px]">
            <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
                <input
                    type="file"
                    name="pdf"
                    accept="application/pdf"
                    onChange={(event) => {
                        formik.setFieldValue('pdf', event.target.files[0]);
                        setFile(event.target.files[0]);
                    }}
                    className="mb-4"
                />
                {formik.errors.pdf && formik.touched.pdf && (
                    <div className="text-red-500 mb-4">{formik.errors.pdf}</div>
                )}
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Upload PDF
                </button>
            </form>

            {pdfData && (
                <div className="pdf-viewer mt-8">
                    <Document file={pdfData.filePath}>
                        <div className="flex flex-wrap justify-center gap-4">
                            {Array.from(new Array(pdfData.numPages), (el, index) => (
                                <div
                                    key={`page_${index}`}
                                    className="flex flex-col items-center w-full sm:w-[45%] md:w-[30%] lg:w-[18%] xl:w-[16%]"
                                >
                                    <div className="border p-2 w-full h-[290px]">
                                        <Page pageNumber={index + 1} height={250} className="w-full h-full flex justify-end" />
                                    </div>
                                    <label className="flex items-center mt-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedPages.includes(index + 1)}
                                            onChange={() => handlePageSelection(index + 1)}
                                            className="mr-2"
                                        />
                                        Page {index + 1}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Document>

                    <div className="mt-8 text-center">
                        <button
                            onClick={handleDownload}
                            className={`bg-green-500 text-white py-2 px-4 rounded ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isDownloading}
                        >
                            {isDownloading ? 'Downloading...' : 'Create New PDF'}
                        </button>
                    </div>
                </div>
            )}

            {/* Render the ExtractPdfs component */}
            <ExtractPdfs extractedPdfs={extractedPdfs} setExtractedPdfs={setExtractedPdfs} />
        </div>
    );
};

export default PdfUploader;
