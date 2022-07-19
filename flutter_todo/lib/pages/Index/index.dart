import 'package:bot_toast/bot_toast.dart';
import 'package:flutter/material.dart';
import 'package:flutter_todo/global_config.dart';
import 'package:flutter_todo/pages/Date/index.dart';
import 'package:flutter_todo/pages/Home/index.dart';
import 'package:flutter_todo/pages/Review/index.dart';
import 'package:flutter_todo/widget/Aside/index.dart';
import 'package:flutter_todo/widget/Button/index.dart';
import 'package:flutter_todo/widget/Footer/index.dart';
import 'package:flutter_todo/widget/header/index.dart';

class Index extends StatefulWidget {
  const Index({super.key, this.activeIndex = 0});

  final int activeIndex;

  @override
  IndexState createState() => IndexState();
}

class IndexState extends State<Index> {
  late int currentIndex;

  @override
  void initState() {
    super.initState();
    currentIndex = widget.activeIndex;
  }

  void handleItemTap(String key, Function done) {
    switch (key) {
      case "todo":
        currentIndex = 0;
        break;
      case "date":
        currentIndex = 1;
        break;
      case "finished":
        currentIndex = 0;
        break;
      case "recycle":
        currentIndex = 1;
        break;
      default:
    }

    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> pageState = [
      {
        "page": const Home(),
        "title": "待办",
        "actions": EButton(text: "新增", onPressed: () {}),
      },
      {"page": const Date(), "title": "日程"},
      {"page": const Review(), "title": "回顾"}
    ];

    final currentPage = pageState[currentIndex];

    return MaterialApp(
      debugShowCheckedModeBanner: GlobalConfig.debugBanner,
      // 注册 Toast 全局实例
      builder: BotToastInit(),
      navigatorObservers: [BotToastNavigatorObserver()],
      theme: GlobalConfig.themeData,
      title: currentPage["title"],
      // routes: GlobalConfig.routes,
      // home: const Login(),
      home: Scaffold(
        appBar: Header(
          title: currentPage["title"],
          actions: currentPage["actions"],
        ),
        body: pageState[currentIndex]["page"],
        bottomNavigationBar: Footer(
            currentIndex: currentIndex,
            onBottomTap: (int index) {
              setState(() {
                currentIndex = index;
              });
            }),
        drawer: Aside(onItemTap: handleItemTap),
      ),
      //传入当前路由对象
      // onGenerateRoute: routeBeforeHook
    );
  }
}

Route routeBeforeHook(RouteSettings settings) {
  final name = settings.name;
  var builder = GlobalConfig.routes[name];

  print("luchx ==> $name");

  // 处理 404 场景
  builder ??= (BuildContext context) => const Center(child: Text('404'));

  // 处理权限认证逻辑

  final route = MaterialPageRoute(builder: builder, settings: settings);

  return route;
}
