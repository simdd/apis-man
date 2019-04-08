import Apis from "../src/index";

let serverMap = {
  baseServer: {
    default: true,
    baseURL: "https://base.apis.com"
  },
  authServer: {
    baseURL: "https://auth.apis.com"
  },
  orderServer: {
    baseURL: "http://localhost:4320"
  }
};

let apiMap = {
  getBaseInfo: {
    method: "get",
    url: "/info"
  },
  postOrder: {
    server: "orderServer",
    method: "post",
    url: "/order/:id"
  }
};

Apis.useReq(function(config) {
  config.headers.Authorization = "Bearer";
  return config;
});

let apis = new Apis(serverMap, apiMap);

apis.postOrder({
  rest: {
    id: 1234
  }
});
