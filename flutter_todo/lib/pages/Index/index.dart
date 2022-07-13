import 'package:flutter/material.dart';
import 'package:flutter_todo/global_config.dart';
import 'package:flutter_todo/pages/Home/index.dart';

class Index extends StatelessWidget {
  const Index({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: GlobalConfig.debugBanner,
        theme: GlobalConfig.themeData,
        title: "首页",
        routes: GlobalConfig.routes,
        home: const Home(),
        //传入当前路由对象
        onGenerateRoute: routeBeforeHook
    );
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
