import 'package:flutter/material.dart';

class Footer extends StatelessWidget {
  const Footer({super.key, this.currentIndex = 0, this.onBottomTap});

  final int currentIndex;
  final ValueChanged<int>? onBottomTap;

  @override
  Widget build(BuildContext context) {
    const List<BottomNavigationBarItem> bottomNavList =
        <BottomNavigationBarItem>[
      BottomNavigationBarItem(icon: Icon(Icons.edit), label: "待办"),
      BottomNavigationBarItem(icon: Icon(Icons.date_range), label: "日程"),
      BottomNavigationBarItem(icon: Icon(Icons.history_sharp), label: "回顾"),
    ];

    return Container(
      height: 50.0,
      color: Colors.black,
      child: BottomNavigationBar(
        elevation: 5.0,
        iconSize: 18.0,
        selectedFontSize: 12.0,
        unselectedFontSize: 12.0,
        type: BottomNavigationBarType.fixed,
        currentIndex: currentIndex,
        onTap: onBottomTap,
        items: bottomNavList,
      ),
    );
  }
}
