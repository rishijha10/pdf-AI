import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://172.17.12.93:8000",
  baseURL: "https://genai-video-analyzer-rrcr7xvxjq-uc.a.run.app",
  // baseURL: "https://genai-document-video-analyzer-rrcr7xvxjq-uc.a.run.app",
});

export const axiosDocument = axios.create({
  // baseURL: "http://172.17.12.93:8000",
  // baseURL: "https://genai-video-analyzer-rrcr7xvxjq-uc.a.run.app",
  baseURL: "https://genai-document-video-analyzer-rrcr7xvxjq-uc.a.run.app",
});

//   axiosInstance.interceptors.request.use(
//     async (config) => {
//         const User = JSON.parse(localStorage.getItem(''));
//         const Token = User.token
//         const isAuthenticated = 'false';
//         if (Token) {
//           config.headers.accessToken = Token;
//           config.headers.isAuthenticated = isAuthenticated;
//         }
//         return config;
//     },
//     function (error) {
//       // Do something with request error
//       return Promise.reject(error);
//     }
//   );

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosDocument.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
