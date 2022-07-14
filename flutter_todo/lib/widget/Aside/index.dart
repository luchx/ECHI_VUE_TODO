import 'package:flutter/material.dart';

class Aside extends StatelessWidget {
  const Aside({super.key});

  Widget itemTitle(String title) {
    return Padding(
        padding: const EdgeInsets.only(left: 16.0, bottom: 16.0),
        child: Text(title,
            style: const TextStyle(fontSize: 14.0, color: Color(0xFF999999))));
  }

  Widget itemCell(int iconType, {required String title, String count = ""}) {
    List<Map> iconList = [
      {
        'icon': Icons.favorite,
        'color': Colors.red,
      },
      {
        'icon': Icons.audiotrack,
        'color': Colors.green,
      },
      {
        'icon': Icons.beach_access,
        'color': Colors.blue,
      },
      {
        'icon': Icons.recycling_sharp,
        'color': Colors.purple,
      }
    ];
    return Padding(
        padding: const EdgeInsets.only(left: 16.0, right: 16.0, bottom: 16.0),
        child: Row(
          children: [
            Padding(
              padding: const EdgeInsets.only(right: 8.0),
              child: Icon(
                iconList[iconType]["icon"],
                color: iconList[iconType]["color"],
                size: 16.0,
              ),
            ),
            Expanded(
                child: Text(title,
                    style: const TextStyle(
                        fontSize: 14.0, color: Color(0xFF333333)))),
            Text(count,
                style:
                    const TextStyle(fontSize: 14.0, color: Color(0xFF333333)))
          ],
        ));
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      width: MediaQuery.of(context).size.width * 70 / 100,
      child: ListView(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.only(
                top: 40.0, left: 16.0, right: 16.0, bottom: 30.0),
            child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              const Padding(
                padding: EdgeInsets.only(right: 8.0),
                child: CircleAvatar(
                  radius: 22.5,
                  backgroundColor: Colors.grey,
                  backgroundImage: AssetImage("assets/images/male.jpg"),
                ),
              ),
              Expanded(
                flex: 4,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const <Widget>[
                    Text("代号 10001",
                        style: TextStyle(
                            fontSize: 16.0,
                            color: Color.fromRGBO(0, 0, 0, 0.85))),
                    Text("记录生活的美好~",
                        style: TextStyle(
                            fontSize: 14.0,
                            color: Color.fromRGBO(0, 0, 0, 0.45))),
                  ],
                ),
              ),
            ]),
          ),
          itemTitle("聚焦"),
          itemCell(0, title: '待办', count: "5"),
          itemCell(1, title: "日程", count: "3"),
          itemTitle("历史"),
          itemCell(2, title: "已完成", count: "8"),
          itemCell(3, title: "回收站"),
        ],
      ),
    );
  }
}
