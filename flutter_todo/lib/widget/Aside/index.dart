import 'package:flutter/material.dart';

class Aside extends StatelessWidget {
  const Aside({super.key, required this.onItemTap, this.autoClose = true});

  final bool autoClose;
  final void Function(BuildContext context, String key, Function callback)
      onItemTap;

  Widget itemTitle(String title) {
    return Padding(
        padding: const EdgeInsets.only(left: 16.0, bottom: 16.0),
        child: Text(title,
            style: const TextStyle(fontSize: 14.0, color: Color(0xFF999999))));
  }

  Widget itemCell(String type, {required String title, String count = ""}) {
    Map<String, dynamic> iconList = {
      "todo": {
        'icon': Icons.favorite,
        'color': Colors.red,
      },
      "date": {
        'icon': Icons.audiotrack,
        'color': Colors.green,
      },
      "finished": {
        'icon': Icons.beach_access,
        'color': Colors.blue,
      },
      "recycle": {
        'icon': Icons.recycling_sharp,
        'color': Colors.purple,
      }
    };
    return Padding(
        padding: const EdgeInsets.only(left: 16.0, right: 16.0, bottom: 16.0),
        child: Builder(
          builder: (BuildContext context) => GestureDetector(
              onTap: () {
                if (autoClose) {
                  Scaffold.of(context).closeDrawer();
                }
                onItemTap(
                    context, type, () => {Scaffold.of(context).closeDrawer()});
              },
              child: Row(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: Icon(
                      iconList[type]["icon"],
                      color: iconList[type]["color"],
                      size: 16.0,
                    ),
                  ),
                  Expanded(
                      child: Text(title,
                          style: const TextStyle(
                              fontSize: 14.0, color: Color(0xFF333333)))),
                  Text(count,
                      style: const TextStyle(
                          fontSize: 14.0, color: Color(0xFF333333)))
                ],
              )),
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
          itemCell("todo", title: '待办', count: "5"),
          itemCell("date", title: "日程", count: "3"),
          itemTitle("历史"),
          itemCell("finished", title: "已完成", count: "8"),
          itemCell("recycle", title: "回收站"),
        ],
      ),
    );
  }
}
