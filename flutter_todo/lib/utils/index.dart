import 'package:bot_toast/bot_toast.dart';
import 'package:flutter/material.dart';

class Utils {
  static bool testPhone(String phone) {
    RegExp reg = RegExp(
        r'^((13[0-9])|(15[^4])|(166)|(17[0-8])|(18[0-9])|(19[8-9])|(14[5|7]))\d{8}$');
    return reg.hasMatch(phone);
  }

  static CancelFunc toast(String str) {
    return BotToast.showText(
        text: str,
        borderRadius: const BorderRadius.all(Radius.circular(4.0)),
        textStyle: const TextStyle(fontSize: 12.0, color: Colors.white));
  }
}