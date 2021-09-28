export const checkResponse = (response) => {
    return response.ok 
        ? response.json().then(response => {
                if (response?.success) {
                    return response;
                } else {
                    return Promise.reject(response);
                }
            }) 
        : response.json().then((error) => Promise.reject(error));
}