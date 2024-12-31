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

    return fetch(url, fetchData).then((response) => {
        const statusCode = response.status
        if (statusCode === 200) {
            return response.json()
        } else if (statusCode === 403) {
            return Promise.reject("You don't have permission to do that.")
        } else {
            console.log(response.json())
            return Promise.reject("An error occurred, please check logs.")
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


export default ajax;