# 克隆项目代码

```bash
# 克隆项目代码
$ git clone https://github.com/luchx/ECHI_VUE_TODO.git
```

## 数据库

启动项目前一定要在创建好 `todo_sql` 数据库，以下是执行数据库命令：

```bash
# 登录数据库
$ mysql -uroot -p密码

# 创建 todo_sql 数据库
$ CREATE DATABASE IF NOT EXISTS todo_sql DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
