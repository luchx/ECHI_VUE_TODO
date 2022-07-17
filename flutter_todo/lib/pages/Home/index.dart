import 'package:flutter/material.dart';
import 'package:flutter_todo/widget/TodoCard/index.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  HomeState createState() => HomeState();
}

class HomeState extends State<Home> {
  static const loadingTag = "##loading##"; //表尾标记
  final _words = <String>[loadingTag];

  @override
  void initState() {
    super.initState();
    _retrieveData();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView.separated(
          itemCount: _words.length,
          itemBuilder: (context, index) {
            // 如果到了表尾
            if (_words[index] == loadingTag) {
              //不足100条，继续获取数据
              if (_words.length - 1 < 100) {
                //获取数据
                _retrieveData();
                //加载时显示loading
                return Container(
                  padding: const EdgeInsets.all(16.0),
                  alignment: Alignment.center,
                  child: const SizedBox(
                    width: 24.0,
                    height: 24.0,
                    child: CircularProgressIndicator(strokeWidth: 2.0),
                  ),
                );
              } else {
                //已经加载了100条数据，不再获取数据。
                return Container(
                  alignment: Alignment.center,
                  padding: const EdgeInsets.all(16.0),
                  child: const Text(
                    "没有更多了",
                    style: TextStyle(color: Colors.grey),
                  ),
                );
              }
            }
            //显示单词列表项
            return const TodoCard(data: '',);
          },
          separatorBuilder: (context, index) => const SizedBox(height: 16.0),
        ));
  }

  void _retrieveData() {
    Future.delayed(const Duration(seconds: 2)).then((e) {
      setState(() {
        //重新构建列表
        _words.insertAll(
          _words.length - 1,
          //每次生成20个单词
          [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f"
          ],
        );
      });
    });
  }
}
