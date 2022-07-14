import 'package:flutter/material.dart';

class EButton extends StatelessWidget {
  const EButton(
      {super.key,
      this.text = "",
      this.fontSize = 14.0,
      this.side = BorderSide.none,
      required this.onPressed});

  final String text;
  final double fontSize;
  final BorderSide side;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return TextButton(
        onPressed: onPressed,
        style: ButtonStyle(
            // 文字颜色
            foregroundColor: MaterialStateProperty.all<Color>(Colors.blue),
            // 背景颜色
            backgroundColor: MaterialStateProperty.all<Color>(Colors.white),
            side: MaterialStateProperty.all<BorderSide>(side),
            shape: MaterialStateProperty.all<OutlinedBorder>(
                RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(0)))),
        child: Text(
          text,
          style: TextStyle(fontSize: fontSize),
        ));
  }
}
