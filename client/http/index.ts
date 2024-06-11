import axios from 'axios';
export const API_URL = `/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${useCookie('token').value}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.response.data?.message == 'Invalid token' && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post<any>(`${API_URL}/auth/refresh`, {withCredentials: true})
            useCookie('token').value = response.data.token
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api;