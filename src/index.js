import axios from "axios";

class Apis {
  constructor(serverMap, apiMap) {
    this.serverMap = serverMap;
    this.apiMap = apiMap;
    this.instance = {};

    if (this.validate) {
      this.format();
      this.middleware();
      this.combine();
      return this.instance;
    } else {
      console.error("apis: 参数不合法，请检查你的配置参数");
    }
  }

  get validate() {
    return true;
  }

  get base() {
    let base = "";

    for (const key of Object.keys(this.serverMap)) {
      if (!base) {
        base = key;
      }

      if (this.serverMap[key].default) {
        base = key;
      }
    }

    if (!base) {
      console.error("apis: 找不到默认服务器配置");
    }

    return base;
  }

  format() {
    for (const key of Object.keys(this.apiMap)) {
      const item = this.apiMap[key];

      if (!item.server) {
        item.server = this.base;
      }

      Object.assign(item, this.serverMap[item.server], item);
    }
  }

  middleware() {
    Apis.reqMiddleware.map(function(middleware) {
      axios.interceptors.request.use(middleware);
    });

    Apis.resMiddleware.map(function(middleware) {
      axios.interceptors.response.use(middleware);
    });
  }

  restful(url, rest) {
    const regex = /\:[^/]*/g;

    return url.replace(regex, p => {
      const key = p.slice(1);
      if (rest[key]) {
        return rest[key];
      }
      return p;
    });
  }

  comboo(bf, af) {
    if (af.rest) {
      bf.url = this.restful(bf.url, af.rest);
    }

    return Object.assign({}, bf, af);
  }

  combine() {
    for (const key of Object.keys(this.apiMap)) {
      this.instance[key] = config => {
        let result = this.apiMap[key];
        if (config) {
          result = this.comboo(this.apiMap[key], config);
        }
        return axios.request(result);
      };
    }
  }
}

Apis.reqMiddleware = [];
Apis.resMiddleware = [];

Apis.useReq = function(middleware) {
  Apis.reqMiddleware.push(middleware);
};
Apis.useRes = function(middleware) {
  Apis.resMiddleware.push(middleware);
};

export default Apis;
