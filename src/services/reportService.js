import {ajaxBinary, METHOD_GET} from "./fetchService.js";
import {report_endpoint} from "../utils/SpringEndpoint.js";

export const reportService = {
    async getReportPDF(token) {
        return ajaxBinary(report_endpoint.export_transaction_pdf, METHOD_GET, token);
    },

    async getReportExcelPreview(token) {
        return ajaxBinary(report_endpoint.export_transaction_excel_preview, METHOD_GET, token);
    },

    async getReportExcel(token) {
        return ajaxBinary(report_endpoint.export_transaction_excel, METHOD_GET, token);
    },
}