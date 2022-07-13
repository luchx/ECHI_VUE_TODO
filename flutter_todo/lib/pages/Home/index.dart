import 'package:flutter/material.dart';
import 'package:flutter_todo/global_config.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  HomeState createState() => HomeState();
}

class HomeState extends State<Home> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: GlobalConfig.debugBanner,
        theme: GlobalConfig.themeData,
        title: "待办",
        home: Scaffold(
          appBar: AppBar(
            toolbarHeight: 50.0,
            centerTitle: true,
            title: const Text("待办", style: TextStyle(fontSize: 16.0)),
            actions: <Widget>[
              // 使用 UnconstrainedBox 去除父元素限制
              UnconstrainedBox(
                child: TextButton(
                  onPressed: () {},
                  style: TextButton.styleFrom(
                    // 文字颜色
                    foregroundColor: Colors.blue,
                    // 背景颜色
                    backgroundColor: Colors.white,
                    // // 水波纹
                    // overlayColor: MaterialStateProperty.resolveWith((states) {
                    //   return (textColor ?? (isDark ? Colours.dark_button_text : Colors.white)).withOpacity(0.12);
                    // }),
                    // 按钮最小大小
                    // minimumSize:
                    //     MaterialStateProperty.all<Size>(const Size(0, 32.0)),
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    // shape: MaterialStateProperty.all<OutlinedBorder>(
                    //   RoundedRectangleBorder(
                    //     borderRadius: BorderRadius.circular(radius),
                    //   ),
                    // ),
                    // side: MaterialStateProperty.all<BorderSide>(side),
                  ),
                  child: const Text("新增",
                      style: TextStyle(fontSize: 14.0, color: Colors.blue)),
                ),
              ),
            ],
          ),
          body: const Text("aaaaa"),
          drawer: Drawer(
            child: ListView(
              children: const <Widget>[
                DrawerHeader(
                  decoration: BoxDecoration(
                    color: Colors.green,
                  ),
                  child: Text(
                    'Hello World',
                    style: TextStyle(
                      color: Colors.green,
                      fontSize: 24,
                    ),
                  ),
                ),
                ListTile(
                  title: Text('Gallery'),
                ),
                ListTile(
                  title: Text('Slideshow'),
                ),
              ],
            ),
          ),
        ));
  }
}

/// 默认字号18，白字蓝底，高度48
class MyButton extends StatelessWidget {
  const MyButton({
    Key? key,
    this.text = '',
    this.fontSize = 18.0,
    this.textColor,
    this.disabledTextColor,
    this.backgroundColor,
    this.disabledBackgroundColor,
    this.minHeight = 48.0,
    this.minWidth = double.infinity,
    this.padding = const EdgeInsets.symmetric(horizontal: 16.0),
    this.radius = 2.0,
    this.side = BorderSide.none,
    required this.onPressed,
  }) : super(key: key);

  final String text;
  final double fontSize;
  final Color? textColor;
  final Color? disabledTextColor;
  final Color? backgroundColor;
  final Color? disabledBackgroundColor;
  final double? minHeight;
  final double? minWidth;
  final VoidCallback? onPressed;
  final EdgeInsetsGeometry padding;
  final double radius;
  final BorderSide side;

  @override
  Widget build(BuildContext context) {
    final bool isDark = GlobalConfig.dark;
    return TextButton(
        onPressed: onPressed,
        style: ButtonStyle(
          // 文字颜色
          foregroundColor: MaterialStateProperty.resolveWith(
            (states) {
              if (states.contains(MaterialState.disabled)) {
                return disabledTextColor ??
                    (isDark
                        ? Colours.dark_text_disabled
                        : Colours.text_disabled);
              }
              return textColor ??
                  (isDark ? Colours.dark_button_text : Colors.white);
            },
          ),
          // 背景颜色
          backgroundColor: MaterialStateProperty.resolveWith((states) {
            if (states.contains(MaterialState.disabled)) {
              return disabledBackgroundColor ??
                  (isDark
                      ? Colours.dark_button_disabled
                      : Colours.button_disabled);
            }
            return backgroundColor ??
                (isDark ? Colours.dark_app_main : Colours.app_main);
          }),
          // 水波纹
          overlayColor: MaterialStateProperty.resolveWith((states) {
            return (textColor ??
                    (isDark ? Colours.dark_button_text : Colors.white))
                .withOpacity(0.12);
          }),
          // 按钮最小大小
          minimumSize: (minWidth == null || minHeight == null)
              ? null
              : MaterialStateProperty.all<Size>(Size(minWidth!, minHeight!)),
          padding: MaterialStateProperty.all<EdgeInsetsGeometry>(padding),
          shape: MaterialStateProperty.all<OutlinedBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(radius),
            ),
          ),
          side: MaterialStateProperty.all<BorderSide>(side),
        ),
        child: Text(
          text,
          style: TextStyle(fontSize: fontSize),
        ));
  }
}

class Colours {
  static const Color app_main = Color(0xFF4688FA);
  static const Color dark_app_main = Color(0xFF3F7AE0);

  static const Color bg_color = Color(0xfff1f1f1);
  static const Color dark_bg_color = Color(0xFF18191A);

  static const Color material_bg = Color(0xFFFFFFFF);
  static const Color dark_material_bg = Color(0xFF303233);

  static const Color text = Color(0xFF333333);
  static const Color dark_text = Color(0xFFB8B8B8);

  static const Color text_gray = Color(0xFF999999);
  static const Color dark_text_gray = Color(0xFF666666);

  static const Color text_gray_c = Color(0xFFcccccc);
  static const Color dark_button_text = Color(0xFFF2F2F2);

  static const Color bg_gray = Color(0xFFF6F6F6);
  static const Color dark_bg_gray = Color(0xFF1F1F1F);

  static const Color line = Color(0xFFEEEEEE);
  static const Color dark_line = Color(0xFF3A3C3D);

  static const Color red = Color(0xFFFF4759);
  static const Color dark_red = Color(0xFFE03E4E);

  static const Color text_disabled = Color(0xFFD4E2FA);
  static const Color dark_text_disabled = Color(0xFFCEDBF2);

  static const Color button_disabled = Color(0xFF96BBFA);
  static const Color dark_button_disabled = Color(0xFF83A5E0);

  static const Color unselected_item_color = Color(0xffbfbfbf);
  static const Color dark_unselected_item_color = Color(0xFF4D4D4D);

  static const Color bg_gray_ = Color(0xFFFAFAFA);
  static const Color dark_bg_gray_ = Color(0xFF242526);

  static const Color gradient_blue = Color(0xFF5793FA);
  static const Color shadow_blue = Color(0x805793FA);
  static const Color orange = Color(0xFFFF8547);
}
