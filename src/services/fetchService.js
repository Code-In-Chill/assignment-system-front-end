function ajax(url, requestMethod, token, requestBody) {

    const fetchData = {
        headers: {
            "Content-Type": "application/json"
        },
        method: requestMethod,
    }

    if (token) {
        fetchData.headers.Authorization = `Bearer ${token}`
    }

    if (requestBody) {
        fetchData.body = JSON.stringify(requestBody)
    }

    return fetch(url, fetchData).then(async (response) => {
        const statusCode = response.status

        // Attempt to parse response as JSON
        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            try {
                data = await response.json();
            } catch (e) {
                data = await response.text();
            }
        } else {
            data = await response.text();
        }

        if (statusCode === 200) {
            return data;
        } else if (statusCode === 401) {
            throw new Error("Phiên đăng nhập đã hết hạn.");
        } else if (statusCode === 403) {
            throw new Error("Bạn không có quyền thực hiện thao tác này.");
        } else if (statusCode === 400) {
            throw new Error(data.message || "Dữ liệu không hợp lệ.");
        } else if (statusCode === 404) {
            throw new Error("Không tìm thấy tài nguyên yêu cầu.");
        } else {
            throw new Error(data.message || "Đã có lỗi xảy ra, vui lòng thử lại sau.");
        }
    })
}

export function ajaxBinary(url, requestMethod, token) {
    const fetchData = {
        headers: {
            "Accept": "*/*"
        },
        method: requestMethod,
    }

    if (token) {
        fetchData.headers.Authorization = `Bearer ${token}`
    }

    return fetch(url, fetchData).then(async (response) => {
        const statusCode = response.status

        if (statusCode === 200) {
            return response.blob();
        } else if (statusCode === 401) {
            throw new Error("Phiên đăng nhập đã hết hạn.");
        } else if (statusCode === 403) {
            throw new Error("Bạn không có quyền thực hiện thao tác này.");
        } else if (statusCode === 404) {
            throw new Error("Không tìm thấy tài nguyên yêu cầu.");
        } else {
            const errorText = await response.text();
            throw new Error(errorText || "Đã có lỗi xảy ra, vui lòng thử lại sau.");
        }
    })
}

export function ajaxUrlEncoded(url, requestMethod, token, requestBody) {

    const fetchData = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: requestMethod,
    }

    if (token) {
        fetchData.headers.Authorization = `Bearer ${token}`
    }

    if (requestBody) {
        fetchData.body = requestBody
    }

    return fetch(url, fetchData).then((response) => {
        const statusCode = response.status
        if (statusCode === 200) {
            return response.json()
        } else {
            return Promise.reject(response)
        }
    })
}

export const METHOD_GET = "GET"
export const METHOD_POST = "POST"
export const METHOD_PUT = "PUT"
export const METHOD_DELETE = "DELETE"


export default ajax;