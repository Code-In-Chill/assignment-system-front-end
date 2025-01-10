import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../components/private-route/AuthManagement.jsx';
import {reportService} from '../../services/reportService.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const PreviewReport = () => {
    const navigate = useNavigate();
    const [, , keycloak] = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [pdfUrl, setPdfUrl] = useState(null);
    const [excelUrl, setExcelUrl] = useState(null);

    const [pdfBlob, setPdfBlob] = useState(null);
    const [, setExcelBlob] = useState(null);

    const [viewing, setViewing] = useState("pdf");

    const handlePreviewPDF = async () => {
        try {
            setLoading(true);
            setError(null);
            setViewing("pdf")

            const response = await reportService.getReportPDF(keycloak.token);

            // Create PDF File
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer], {type: 'application/pdf'});
            setPdfBlob(blob);

            const url = window.URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra khi tạo báo cáo PDF');
        } finally {
            setLoading(false);
        }
    };

    const handlePreviewExcel = async () => {
        try {
            setLoading(true);
            setError(null);
            setViewing("excel");

            const response = await reportService.getReportExcelPreview(keycloak.token);

            // Create Excel File
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer], {type: 'application/pdf'});
            setExcelBlob(blob);

            const url = window.URL.createObjectURL(blob);
            setExcelUrl(url);
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra khi tạo báo cáo Excel');
        } finally {
            setLoading(false);
        }
    }

    const handleDownload = async (type) => {
        try {
            setLoading(true);
            setError(null);

            let response;
            let mimeType;
            let extension;
            let blob;

            if (type === 'pdf') {
                blob = pdfBlob;
                extension = 'pdf';
            } else {
                response = await reportService.getReportExcel(keycloak.token);
                mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                extension = 'xlsx';

                const arrayBuffer = await response.arrayBuffer();
                blob = new Blob([arrayBuffer], {type: mimeType});
            }

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.download = `report-${Date.now()}.${extension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            navigate('/home');
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra khi tải xuống báo cáo');
        } finally {
            setLoading(false);
        }
    };

    // Load PDF preview when component mounts
    useEffect(() => {
        if (viewing === "pdf") {
            handlePreviewPDF();
        } else if (viewing === "excel") {
            handlePreviewExcel();
        }
        // Cleanup function to revoke object URL
        return () => {
            if (pdfUrl) {
                window.URL.revokeObjectURL(pdfUrl);
            }

            if (excelUrl) {
                window.URL.revokeObjectURL(excelUrl);
            }
        };
    }, []);

    return (
        <div className="container mt-4">
            <div className="card w-75 h-100 mx-auto shadow">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Xem Trước Báo Cáo</h4>
                </div>

                <div className="card-body">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    {loading &&
                        <LoadingSpinner message="Đang tạo báo cáo..."/>
                    }

                    {(pdfUrl || excelUrl) && !loading && (
                        <>
                            {viewing === "pdf" && (
                                <div className="mb-4">
                                    <iframe
                                        src={pdfUrl + "#toolbar=0"}
                                        className="card w-100"
                                        style={{height: '60vh'}}
                                        title="PDF Preview"
                                    />
                                </div>
                            )}

                            {viewing === "excel" && (
                                <div className="mb-4">
                                    <iframe
                                        src={excelUrl + "#toolbar=0"}
                                        className="card w-100"
                                        style={{height: '60vh'}}
                                        title="PDF Preview"
                                    />
                                </div>
                            )}

                            <div className="d-flex gap-3">
                                <button
                                    className="btn btn-lg btn-primary flex-grow-1"
                                    onClick={viewing === "pdf" ? () => handleDownload('pdf') : handlePreviewPDF}
                                >
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             fill="currentColor"
                                             className="bi bi-file-pdf" viewBox="0 0 16 16">
                                            <path
                                                d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
                                            <path
                                                d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 19.3 19.3 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.95 10.95 0 0 0 .98 1.686 5.7 5.7 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.4-.525.852-.724 1.325-.038.09-.077.18-.118.27M6.59 11.2c.374-.761.746-1.505 1.109-2.21-.614.198-1.184.428-1.697.684-.429.214-.813.482-1.091.79-.118.13-.193.28-.23.45-.039.18-.01.37.051.55.126.361.372.624.71.723.255.076.515.076.75-.008zm4.677-1.665c.18-.162.317-.35.4-.555.088-.204.104-.427.064-.644-.042-.218-.157-.41-.33-.552-.175-.144-.413-.222-.69-.252.117.342.235.672.348.99.095.262.201.528.318.763zM7.93 7.477c-.234.652-.445 1.322-.635 1.993.335-.327.711-.624 1.125-.889.275-.172.558-.335.84-.492a7 7 0 0 1-.149-.325c-.273-.632-.662-1.457-1.181-2.29zm1.489-1.307c.099-.014.202.004.304.048.066.04.13.094.179.163.058.083.095.18.095.284 0 .105-.034.217-.114.344-.165.288-.393.577-.648.868l-.157.18c.13.284.258.556.386.819a6.3 6.3 0 0 0 .257-.508c.144-.344.253-.703.317-1.06.064-.355.043-.616-.058-.774a.5.5 0 0 0-.257-.21.6.6 0 0 0-.304-.048z"/>
                                        </svg>
                                        {viewing === "pdf" ? "Tải PDF" : "Xem trước file PDF"}
                                    </div>
                                </button>

                                <button
                                    className="btn btn-lg btn-success flex-grow-1"
                                    onClick={viewing === "excel" ? () => handleDownload('xlsx') : handlePreviewExcel}
                                >
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             fill="currentColor"
                                             className="bi bi-file-excel" viewBox="0 0 16 16">
                                            <path
                                                d="M5.18 4.616a.5.5 0 0 1 .704.064L8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 0 1 .064-.704z"/>
                                            <path
                                                d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
                                        </svg>
                                        {viewing === "excel" ? "Tải Excel" : "Xem trước file Excel"}
                                    </div>
                                </button>
                            </div>
                        </>
                    )}

                    <div className="mt-2">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('/home')}
                        >
                            Quay Lại Trang Chủ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default PreviewReport;