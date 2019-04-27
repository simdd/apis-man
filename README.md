# apis

[![npm version](https://img.shields.io/npm/v/@forchange/apis.svg)](https://www.npmjs.com/package/@forchange/apis)
[![license](https://img.shields.io/npm/l/@forchange/apis.svg)](https://www.npmjs.com/package/@forchange/apis)

基于 [axios](https://github.com/axios/axios) 封装的接口管理方案

## Features

- 接口统一管理
- 可配置多个接口服务
- 支持 restful 接口

## Installing

```
$ npm install @forchange/apis
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
  }
}
```

## Custom

- #### `rest`：restful 参数

```javascript
apis.postOrder({
  rest: {
    id: 1
  }
})
```

## Interceptors

Apis 通过`useReq`,`useRes`两个接口对请求做拦截，可以多次调用，添加多个 middleware

#### Apis.useReq(middleware)

同 [`axios.interceptors.request.use`](https://github.com/axios/axios#interceptors)

#### Apis.useRes(middleware)

同 [`axios.interceptors.response.use`](https://github.com/axios/axios#interceptors)

```javascript
Apis.useReq(function(config) {
  config.headers.Authorization = "Bearer";
  return config;
});
```

## Usage

```javascript
const apis = new Apis(serverMap, apiMap);

apis.getTest({
  params: {
    color: "green"
  }
});
```

## License

MIT
