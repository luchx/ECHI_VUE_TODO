import 'package:flutter/material.dart';

class TodoCard extends StatefulWidget {
  const TodoCard({super.key, required this.data});

  final String data;

  @override
  TodoCardState createState() => TodoCardState();
}

class TodoCardState extends State<TodoCard> {
  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
        decoration: BoxDecoration(
            color: Colors.white, //背景渐变
            borderRadius: BorderRadius.circular(2.0), //3像素圆角
            boxShadow: const [
              //阴影
              BoxShadow(
                  color: Color.fromRGBO(0, 0, 0, 0.05),
                  offset: Offset(.0, 2.0),
                  blurRadius: 8.0)
            ]),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Checkbox(
                activeColor: Colors.blue,
                onChanged: (bool? value) {},
                value: false,
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    const Padding(
                      padding: EdgeInsets.only(bottom: 8.0),
                      child: Text(
                          "阿松大了好久客户阿松大了好久客户阿松大了好久客户阿松大了好久客户阿松大了好久客户阿松大了好久客户",
                          style: TextStyle(
                              fontSize: 16.0,
                              color: Color.fromRGBO(0, 0, 0, 0.65))),
                    ),
                    Row(
                      children: const <Widget>[
                        Padding(
                            padding: EdgeInsets.only(right: 4.0),
                            child: Icon(Icons.alarm,
                                size: 14.0, color: Colors.red)),
                        Text("data",
                            style: TextStyle(fontSize: 14.0, color: Colors.red))
                      ],
                    )
                  ],
                ),
              )
            ],
          ),
        ));
  }
}
