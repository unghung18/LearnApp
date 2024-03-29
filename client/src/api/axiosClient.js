import axios from 'axios';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';

const axiosClient = axios.create({
    baseURL: 'https://lanie-server.onrender.com/api/',
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config) => {
    const user = localStorage.getItem('currentUser');
    if (user) {
        config.headers["token"] = "Bearer " + JSON.parse(user).accessToken;
    }
    /*  let date = new Date();
     const accessToken = user.accessToken;
 
     const decodedToken = jwt_decode(accessToken);
 
     if (decodedToken.exp < date.getTime() / 1000) {
 
         const { data } = await axios.post('http://localhost:8080/api/auth/refreshToken', "Hi", { withCredentials: true });
         const accessToken = data.accessToken;
 
         localStorage.setItem('currentUser', JSON.stringify({ ...user, accessToken }));
     } */
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;
