import 'package:flutter/material.dart';
import 'package:flutter_todo/Login/index.dart';

class GlobalConfig {
  static bool debugBanner = false;
  static bool dark = false;
  static ThemeData themeData = ThemeData.light();

  static final Map<String, WidgetBuilder> routes = {
    '/login': (BuildContext context) => const Login(),
  };
}
