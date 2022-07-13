import 'package:flutter/material.dart';

class EButton extends StatelessWidget {
  const EButton(
      {super.key,
      required this.text,
      required this.fontSize,
      required this.onPressed});

  final String text;
  final double fontSize;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return TextButton(
        onPressed: onPressed,
        child: Text(
          text,
          style: TextStyle(fontSize: fontSize),
        ));
  }
}
