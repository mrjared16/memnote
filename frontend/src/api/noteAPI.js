const noteAPI = {
  search: (params) => {
    console.log("Search ", params);

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [];

      for (let i = 0; i < params.limit; i++) {
        data.push({
          title: "Note",
        });
      }

      const res = {
        result: data,
        total: 30,
      };
      resolve(res);
    }, 1000);
  });
  }
}

export default noteAPI;
