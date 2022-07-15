import 'package:flutter/material.dart';

class Review extends StatefulWidget {
  const Review({super.key});

  @override
  ReviewState createState() => ReviewState();
}

class ReviewState extends State<Review> {
  @override
  Widget build(BuildContext context) {
    return const Text("回顾");
  }
}
