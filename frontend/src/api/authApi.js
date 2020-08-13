const authApi = {
  login: (params) => {
    const url = '';
    // return axiosClient.get(url, { params });
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(params);
        resolve();
      }, 1000);
    });
  }
}

export default authApi;