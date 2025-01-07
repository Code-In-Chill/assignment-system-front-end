import ajax, {METHOD_DELETE, METHOD_GET, METHOD_POST, METHOD_PUT} from "./fetchService.js";
import {transaction_endpoint} from "../utils/SpringEndpoint.js";

export const transactionService = {
    async getAllTransactions(token) {
        return ajax(transaction_endpoint.get_all, METHOD_GET, token);
    },

    async addTransaction(token, transactionData) {
        return ajax(transaction_endpoint.create, METHOD_PUT, token, transactionData);
    },

    async updateTransaction(token, id, transactionData) {
        return ajax(`${transaction_endpoint.update}/${id}`, METHOD_POST, token, transactionData);
    },

    async deleteTransaction(token, transactionId) {
        return ajax(`${transaction_endpoint.delete}/${transactionId}`, METHOD_DELETE, token)
            .then(() => true);
    }
};