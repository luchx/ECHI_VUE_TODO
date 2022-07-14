import 'package:flutter/material.dart';

class Header extends StatelessWidget implements PreferredSizeWidget {
  const Header({super.key, this.title = '', this.actions});

  final String title;
  final Widget? actions;

  @override
  Size get preferredSize => const Size.fromHeight(50.0);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      toolbarHeight: 50.0,
      centerTitle: true,
      title: Text(title, style: const TextStyle(fontSize: 16.0)),
      actions: <Widget>[
        // 使用 UnconstrainedBox 去除父元素限制
        UnconstrainedBox(
            child: Padding(
          padding: const EdgeInsets.only(right: 16.0),
          child: actions,
        )),
      ],
    );
  }
}
