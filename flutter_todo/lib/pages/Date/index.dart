import 'package:flutter/material.dart';

class Date extends StatefulWidget {
  const Date({super.key});

  @override
  DateState createState() => DateState();
}

class DateState extends State<Date> {
  @override
  Widget build(BuildContext context) {
    return const Text("日程");
  }
}
