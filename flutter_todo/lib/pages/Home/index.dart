import 'package:flutter/material.dart';
import 'package:flutter_todo/global_config.dart';
import 'package:flutter_todo/widget/Aside/index.dart';
import 'package:flutter_todo/widget/Button/index.dart';
import 'package:flutter_todo/widget/Footer/index.dart';
import 'package:flutter_todo/widget/header/index.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  HomeState createState() => HomeState();
}

class HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: GlobalConfig.debugBanner,
        theme: GlobalConfig.themeData,
        title: "待办",
        home: Scaffold(
          appBar: Header(
            title: "待办",
            actions: EButton(text: "新增", onPressed: () {}),
          ),
          body: const Text("aaaaa"),
          bottomNavigationBar: const Footer(),
          drawer: const Aside(),
        ));
  }
}
