# Todo 接口文档

> baseUrl: <https://localhost:3000>

## 目录

[1、获取当前时间戳](#1获取当前时间戳)

[2、登录接口](#2登录接口)

[3、获取验证码](#3获取验证码)

[4、获取用户详情](#4获取用户详情)

[5、获取待办列表](#5获取待办列表)

[6、新增待办信息](#6新增待办信息)

[7、编辑待办信息](#7编辑待办信息)

[8、获取待办详情](#8获取待办详情)

[9、根据日期获取待办](#9根据日期获取待办)

[10、获取本周统计](#10获取本周统计)

[11、完成待办](#11完成待办)

[12、获取全部待办日期](#12获取全部待办日期)

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
| code     | y        | int | 验证码与手机号取一个 |
| password     | y        | string | 验证码与手机号取一个 |

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

### 4、获取用户详情

#### 请求 URL

> <https://localhost:3000/api/user/detail/:id>

#### 示例

[https://localhost:3000/api/user/detail/1](https://localhost:3000/api/user/detail/1)

#### 请求方式

> GET

#### 参数类型

| 参数     | 是否必选 | 类型    | 说明                                              |
| :------- | :------: | :------ | :------------------------------------------------ |
| id     | y        | int | 用户 id |

#### 返回示例

```js
{
    "code": 0,
    "result": {
        "id": 1,
        "nickname": null,
        "userName": null,
        "email": null,
        "phone": "18600186001",
        "avatar": null,
        "description": null,
        "gender": 1
    },
    "message": "获取用户成功",
    "timestamp": 1605689441431
}
```

### 5、获取待办列表

#### 请求 URL

> <https://localhost:3000/api/todo/getList>

#### 示例

[https://localhost:3000/api/todo/getList](https://localhost:3000/api/todo/getList)

#### 请求方式

> GET

#### 参数类型

| 参数     | 是否必选 | 类型    | 说明                                              |
| :------- | :------: | :------ | :------------------------------------------------ |
| page     | y        | int | 当前页码 |
| pageSize     | y        | int | 限制每页条数 |

#### 返回示例

```js
{
    "code": 0,
    "result": {
        "id": 1,
        "nickname": null,
        "userName": null,
        "email": null,
        "phone": "18600186001",
        "avatar": null,
        "description": null,
        "gender": 1
    },
    "message": "获取用户成功",
    "timestamp": 1605689441431
}
```

### 6、新增待办信息

#### 请求 URL

> <https://localhost:3000/api/todo/saveList>

#### 示例

[https://localhost:3000/api/todo/saveList](https://localhost:3000/api/todo/saveList)

#### 请求方式

> POST

#### 参数类型

| 参数     | 是否必选 | 类型    | 说明                                              |
| :------- | :------: | :------ | :------------------------------------------------ |
| date     | y        | date | 日期 |
| description     | y        | string | 任务描述 |
| priority     | y        | int | 任务优先级 【1 - 低 2 - 中 3 - 高 4 - 最高】 |
| title     | y        | string | 任务标题 |

#### 返回示例

```js
{
    "code": 0,
    "result": 1,
    "message": "保存成功",
    "timestamp": 1605690507576
}
```

### 7、编辑待办信息

#### 请求 URL

> <https://localhost:3000/api/todo/saveList>

#### 示例

[https://localhost:3000/api/todo/saveList](https://localhost:3000/api/todo/saveList)

#### 请求方式

> POST

#### 参数类型

| 参数     | 是否必选 | 类型    | 说明                                              |
| :------- | :------: | :------ | :------------------------------------------------ |
| id     | y        | int | 任务 id |
| date     | y        | date | 日期 |
| description     | y        | string | 任务描述 |
| priority     | y        | int | 任务优先级 【1 - 低 2 - 中 3 - 高 4 - 最高】 |
| title     | y        | string | 任务标题 |

#### 返回示例

```js
{
    "code": 0,
    "result": 1,
    "message": "保存成功",
    "timestamp": 1605690507576
}
```

### 8、获取待办详情

#### 请求 URL

> <https://localhost:3000/api/todo/getDetail>

#### 示例

[https://localhost:3000/api/todo/getDetail/1](https://localhost:3000/api/todo/getDetail/1)

#### 请求方式

> GET

#### 参数类型

| 参数     | 是否必选 | 类型    | 说明                                              |
| :------- | :------: | :------ | :------------------------------------------------ |
| id     | y        | int | 任务 id |

#### 返回示例

```js
{
    "code": 0,
    "result": {
        "date": "2020-11-02 08:00:00",
        "description": "asdadasda撒大大",
        "id": 2,
        "priority": 3,
        "status": 1,
        "title": "测试新增数据1234"
    },
    "message": "获取成功",
    "timestamp": 1605692594072
}
```

### 9、根据日期获取待办

#### 请求 URL

> <https://localhost:3000/api/todo/getListByDay>

#### 示例

[https://localhost:3000/api/todo/getListByDay](https://localhost:3000/api/todo/getListByDay)

#### 请求方式

> GET

#### 参数类型

| 参数     | 是否必选 | 类型    | 说明                                              |
| :------- | :------: | :------ | :------------------------------------------------ |
| day     | y        | date | 日期 |

#### 返回示例

```js
{
    "code": 0,
    "result": [
        {
            "date": "2020-11-02 08:00:00",
            "description": "asdadasda撒大大",
            "id": 2,
            "priority": 3,
            "status": 1,
            "title": "测试新增数据1234"
        },
        {
            "date": "2020-11-02 08:00:00",
            "description": "asdadasda撒大大",
            "id": 1,
            "priority": 3,
            "status": 1,
            "title": "测试新增数据1234"
        },
        {
            "date": "2020-11-02 08:00:00",
            "description": "asdadasda撒大大",
            "id": 4,
            "priority": 3,
            "status": 1,
            "title": "测试新增数据1234"
        },
        {
            "date": "2020-11-02 08:00:00",
            "description": "asdadasda撒大大",
            "id": 3,
            "priority": 3,
            "status": 1,
            "title": "测试新增数据1234"
        }
    ],
    "message": "获取成功",
    "timestamp": 1605692704575
}
```

### 10、获取本周统计

#### 请求 URL

> <https://localhost:3000/api/todo/getReviewList>

#### 示例

[https://localhost:3000/api/todo/getReviewList](https://localhost:3000/api/todo/getReviewList)

#### 请求方式

> GET

#### 参数类型

| 参数     | 是否必选 | 类型    | 说明                                              |
| :------- | :------: | :------ | :------------------------------------------------ |

#### 返回示例

```js
{
    "code": 0,
    "result": {
        "task": {
            "finishCount": 0,
            "rate": null,
            "total": 0
        },
        "list": []
    },
    "message": "获取成功",
    "timestamp": 1605692827941
}
```

### 11、完成待办

#### 请求 URL

> <https://localhost:3000/api/todo/finishTodo>

#### 示例

[https://localhost:3000/api/todo/finishTodo](https://localhost:3000/api/todo/finishTodo)

#### 请求方式

> PUT

#### 参数类型

| 参数     | 是否必选 | 类型    | 说明                                              |
| :------- | :------: | :------ | :------------------------------------------------ |

#### 返回示例

```js
{
    "code": 0,
    "result": null,
    "message": "操作成功",
    "timestamp": 1605693082546
}
```

### 12、获取全部待办日期

#### 请求 URL

> <https://localhost:3000/api/todo/getDateList>

#### 示例

[https://localhost:3000/api/todo/getDateList](https://localhost:3000/api/todo/getDateList)

#### 请求方式

> GET

#### 参数类型

| 参数     | 是否必选 | 类型    | 说明                                              |
| :------- | :------: | :------ | :------------------------------------------------ |

#### 返回示例

```js
{
    "code": 0,
    "result": [
        "2020-11-02 08:00:00",
        "2020-11-02 08:00:00",
        "2020-11-02 08:00:00",
        "2020-11-02 08:00:00"
    ],
    "message": "获取成功",
    "timestamp": 1605693053719
}
```
