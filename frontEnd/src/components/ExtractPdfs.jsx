import React, { useEffect, useState } from 'react';

const ExtractPdfs = ({ extractedPdfs, setExtractedPdfs }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Update the local state with the extracted PDFs passed from the parent
        setData(extractedPdfs);
    }, [extractedPdfs]); // Dependency array includes extractedPdfs

    return (
        <div className="container mx-auto p-4 pt-[118px]">
            <h2 className="text-2xl font-bold mb-4">Extracted PDFs</h2>
            <div className="flex flex-wrap gap-4">
                {data?.length > 0 ? (
                    data.map((pdf, index) => (
                        <div key={index} className="border p-4 rounded">
                            <h3 className="text-xl font-semibold">{index + 1}</h3>
                            <a
                                href={pdf.pdfUrl}
                                className="text-blue-500 mt-2 block cursor-pointer hover:underline"
                                download={`document_${index + 1}.pdf`} // Default filename for downloaded file
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download PDF
                            </a>
                        </div>
                    ))
                ) : (
                    <p>No PDFs available.</p>
                )}
            </div>
        </div>
    );
};

export default ExtractPdfs;
