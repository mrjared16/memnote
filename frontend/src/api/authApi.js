import axiosClient from './axiosClient';

const authAPI = {
  login: (params) => {
    const url = '/login';
    return axiosClient.post(url, { params });
  },
  register: (params) => {
    const url = '/register';
    return axiosClient.post(url, { params });
  }
}

export default authAPI;