import 'package:flutter/material.dart';
import 'package:flutter_todo/pages/Date/index.dart';
import 'package:flutter_todo/pages/Home/index.dart';
import 'package:flutter_todo/pages/Index/index.dart';
import 'package:flutter_todo/pages/Login/index.dart';

class GlobalConfig {
  static bool debugBanner = false;
  static bool dark = false;
  static ThemeData themeData = ThemeData(
    brightness: Brightness.light,
    primarySwatch: Colors.blue,
    fontFamily: "Avenir,Helvetica,Arial,sans-serif",
    visualDensity: VisualDensity.adaptivePlatformDensity,
  );

  static int currentIndex = 0;

  static final Map<String, WidgetBuilder> routes = {
    r'\/': (BuildContext context) => const Index(),
    '/login': (BuildContext context) => const Login(),
    '/home': (BuildContext context) => const Home(),
    '/date': (BuildContext context) => const Date(),
  };
}
