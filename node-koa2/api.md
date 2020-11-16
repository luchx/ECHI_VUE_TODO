# Todo 接口文档

> baseUrl: <https://localhost:3000>

## 目录

[1、获取当前时间戳](#1获取当前时间戳)

[2、登录接口](#2登录接口)

[3、获取验证码](#3获取验证码)

## 接口列表

### 1、获取当前时间戳

#### 请求 URL

> <https://localhost:3000/api/basic>

#### 示例

[https://localhost:3000/api/basic](https://localhost:3000/api/basic)

#### 请求方式

> GET

#### 参数类型

| 参数     | 是否必选 | 类型    | 说明                                              |
| :------- | :------: | :------ | :------------------------------------------------ |
| -     | -        | - | - |

#### 返回示例

```js
{
    "code": 0,
    "result": 1605516302190,
    "message": "获取成功",
    "timestamp": 1605516302190
}
```

### 2、登录接口

#### 请求 URL

> <https://localhost:3000/api/user/login>

#### 示例

[https://localhost:3000/api/user/login](https://localhost:3000/api/user/login)

#### 请求方式

> POST

#### 参数类型

| 参数     | 是否必选 | 类型    | 说明                                              |
| :------- | :------: | :------ | :------------------------------------------------ |
| phone     | y        | int | 手机号码 |
| code     | y        | int | 验证码 |

#### 返回示例

```js
{
    "code": 0,
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInBob25lIjoiMTg2MDAxODYwMDEiLCJpYXQiOjE2MDU1MTYyMTMsImV4cCI6MTYwNTUzMDYxM30.BQQpoQZKl8N3GXD-evg0V8R_3la7g356sq-ku9mtz-g",
        "user": {
            "id": 1,
            "phone": "18600186001",
            "gender": 1
        }
    },
    "message": "登录成功",
    "timestamp": 1605516213408
}
```

### 3、获取验证码

#### 请求 URL

> <https://localhost:3000/api/user/verify>

#### 示例

[https://localhost:3000/api/user/verify?phone=18600186001](https://localhost:3000/api/user/verify?phone=18600186001)

#### 请求方式

> GET

#### 参数类型

| 参数     | 是否必选 | 类型    | 说明                                              |
| :------- | :------: | :------ | :------------------------------------------------ |
| phone     | y        | int | 手机号码 |

#### 返回示例

```js
{
    "code": 0,
    "result": "1234",
    "message": "获取验证码成功",
    "timestamp": 1605516430762
}
```
