import axios from 'axios';


const httprequest = axios.create({
    baseURL: "https://apisalesjournal.cfapps.ap21.hana.ondemand.com/api/",
});

export const get = async (apipath, params = {}) => {
    const response = await httprequest.get(apipath, params);
    return response.data;
};

export const post = async (apipath, data, params = {}) => {
    const response = await httprequest.post(apipath, data, params);
    return response.data;
};

export const patch = async (apipath, data, params = {}) => {
    const response = await httprequest.patch(apipath, data, params);
    return response.data;
};

export const remove = async (url, data, options = {}) => {
    const response = await httprequest.delete(url, data, options);
    return response.data;
};


// Interceptor để thêm accessToken vào headers của mỗi yêu cầu
httprequest.interceptors.request.use(function (config) {
    const token = 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default httprequest;