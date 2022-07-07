import 'package:flutter/material.dart';
import 'package:flutter_todo/Login/index.dart';
import 'package:flutter_todo/global_config.dart';

class Index extends StatefulWidget {
  const Index({super.key});

  @override
  IndexState createState() => IndexState();
}

class IndexState extends State<Index> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: GlobalConfig.debugBanner,
        theme: GlobalConfig.themeData,
        title: "首页",
        routes: GlobalConfig.routes,
        home: const Login(),
        //传入当前路由对象
        onGenerateRoute: routeBeforeHook);
  }
}

Route routeBeforeHook(RouteSettings settings) {
  final name = settings.name;
  var builder = GlobalConfig.routes[name];

  // 处理 404 场景
  builder ??= (BuildContext context) => const Center(child: Text('404'));

  // 处理权限认证逻辑

  final route = MaterialPageRoute(builder: builder, settings: settings);

  return route;
}
