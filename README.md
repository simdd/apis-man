# api-man

基于 [axios](https://github.com/axios/axios) 封装的接口管理方案

## Features

- 接口统一管理
- 可配置多个接口服务
- 支持 restful 接口

## Installing

```
$ npm install apis
```

## Syntax

```javascript
new Apis(serverMap, apiMap);
```

## Parameters

#### serverMap

- serverMap 是服务配置的 map 对象
- 服务的参数配置同 axios 中的 [config](https://github.com/axios/axios#request-config) 部分
- default 为自定义属性，当 default 为 true 时，api 会使用它做为默认服务配置

```json
{
  "baseServer": {
    "default": true,
    "baseUrl": "https://base.apis.com"
  },
  "authServer": {
    "baseUrl": "https://auth.apis.com"
  },
  "orderServer": {
    "baseUrl": "https://base.apis.com/order"
  }
}
```

#### apiMap

- apiMap 是接口配置的 map 对象
- 接口的参数配置同 axios 中的 [config](https://github.com/axios/axios#request-config) 部分，会覆盖服务配置中的参数
- server 为自定义属性，表示使用哪个服务配置，当 server 为 null 时，表示使用默认服务配置

```json
{
  "getBaseInfo": {
    "method": "get",
    "url": "/info"
  },
  "postOrder": {
    "server": "orderServer",
    "method": "post",
    "url": "/order/:id"
  }
}
```

## Custom Config

#### `rest`：url 中 restful 参数的值

```javascript
// url
/order/:id

// rest
rest: {
    id: 123
}

// result
/order/123
```

## Interceptors

## Usage

```javascript
import Apis from "api-man";
import serverMap from "./serverMap";
import apiMap from "./apiMap";
const apis = new Apis(serverMap, apiMap);

apis.getTest({
  params: {
    color: "green"
  }
});

apis.postTest({
  rest: {
    id: 3
  },
  data: {
    name: "fred"
  }
});
```

## License

MIT
