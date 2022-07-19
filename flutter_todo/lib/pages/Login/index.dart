import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_todo/global_config.dart';
import 'package:flutter_todo/pages/Index/index.dart';
import 'package:flutter_todo/utils/index.dart';
import 'package:flutter_todo/widget/Button/index.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  LoginState createState() => LoginState();
}

class LoginState extends State<Login> {
  Timer? codeTimer;

  ///记录当前的时间
  int currentTimer = 120;
  String codeText = "获取验证码";
  bool sendingCodeStatus = false;
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController codeController = TextEditingController();

  @override
  void dispose() {
    super.dispose();

    ///取消计时器
    if (codeTimer != null) {
      codeTimer!.cancel();
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: GlobalConfig.debugBanner,
      theme: GlobalConfig.themeData,
      title: "登录",
      home: MaterialApp(
        debugShowCheckedModeBanner: GlobalConfig.debugBanner,
        theme: GlobalConfig.themeData,
        home: Scaffold(
          backgroundColor: Colors.white,
          body: Container(
            padding: const EdgeInsets.only(top: 60.0, left: 40.0, right: 40.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.only(bottom: 40.0),
                  child: Container(
                    constraints: const BoxConstraints.expand(
                      height: 100.0,
                    ),
                    decoration: const BoxDecoration(
                        image: DecorationImage(
                            image: AssetImage("assets/images/logo.png"))),
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text("手机号码"),
                    Container(
                      margin: const EdgeInsets.only(bottom: 16.0),
                      decoration: const BoxDecoration(
                          border: Border(
                              bottom: BorderSide(
                                  width: 1.0,
                                  color: Color.fromRGBO(0, 0, 0, 0.25)))),
                      child: TextField(
                        controller: phoneController,
                        style: const TextStyle(
                          color: Colors.black87,
                          fontSize: 12,
                        ),
                        decoration: const InputDecoration(
                          contentPadding: EdgeInsets.symmetric(
                              vertical: 12.0, horizontal: 4.0),
                          hintText: '请输入手机号码',
                          hintStyle: TextStyle(fontSize: 12.0),
                          enabledBorder: InputBorder.none,
                          focusedBorder: InputBorder.none,
                        ),
                      ),
                    ),
                    const Text("验证码"),
                    Container(
                      decoration: const BoxDecoration(
                          border: Border(
                              bottom: BorderSide(
                                  width: 1.0,
                                  color: Color.fromRGBO(0, 0, 0, 0.25)))),
                      child: Row(
                        children: [
                          Expanded(
                              child: TextField(
                            controller: codeController,
                            style: const TextStyle(
                              color: Colors.black87,
                              fontSize: 12,
                            ),
                            decoration: const InputDecoration(
                              contentPadding: EdgeInsets.symmetric(
                                  vertical: 12.0, horizontal: 4.0),
                              labelStyle: TextStyle(
                                color: Colors.white54,
                                fontSize: 12,
                              ),
                              hintText: '请输入验证码',
                              hintStyle: TextStyle(fontSize: 12.0),
                              enabledBorder: InputBorder.none,
                              focusedBorder: InputBorder.none,
                            ),
                          )),
                          EButton(
                              text: codeText,
                              fontSize: 12.0,
                              onPressed: handleSendCode),
                        ],
                      ),
                    )
                  ],
                ),
                // 登录按钮
                Padding(
                  padding: const EdgeInsets.only(top: 28.0),
                  child: Row(
                    children: <Widget>[
                      Expanded(
                        child: ElevatedButton(
                          onPressed: handleSubmit,
                          child: const Padding(
                            padding: EdgeInsets.symmetric(
                                vertical: 10.0, horizontal: 16.0),
                            child: Text("登录"),
                          ),
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  void handleSendCode() {
    if (sendingCodeStatus) {
      return;
    }
    String phone = phoneController.text;
    if (!validatePhone(phone)) {
      return;
    }

    sendingCodeStatus = true;

    Utils.toast("验证码为： 1234");
    getLeftTime();
  }

  void handleSubmit() {
    String phone = phoneController.text;
    String code = codeController.text;
    if (!validatePhone(phone)) {
      return;
    }
    if (code.isEmpty) {
      Utils.toast("请输入验证码");
      return;
    }
    Navigator.of(context).pushNamed("/", arguments: {"activeIndex": 0});
  }

  bool validatePhone(String phone) {
    if (phone == "") {
      Utils.toast("请输入您的手机号码");
      return false;
    }
    if (!Utils.testPhone(phone)) {
      Utils.toast("您的号码输入错误");
      return false;
    }
    return true;
  }

  void getLeftTime() {
    ///取消计时器
    if (codeTimer != null) {
      codeTimer!.cancel();
    }

    ///间隔1秒
    codeTimer = Timer.periodic(const Duration(milliseconds: 1000), (timer) {
      if (currentTimer < 0) {
        codeText = "获取验证码";
        timer.cancel();
      } else {
        codeText = "$currentTimer s";
      }
      currentTimer--;
      setState(() {});
    });
  }
}
