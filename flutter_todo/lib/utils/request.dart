import 'package:dio/dio.dart';

enum DioMethod {
  get,
  post,
  put,
  delete,
  patch,
  head,
}

class Service {
  /// 连接超时时间
  static const int CONNECT_TIMEOUT = 6 * 1000;

  /// 响应超时时间
  static const int RECEIVE_TIMEOUT = 6 * 1000;

  /// 请求的URL前缀
  static String BASE_URL = "http://localhost:3000";

  /// 是否开启网络缓存,默认false
  static bool CACHE_ENABLE = false;

  /// 最大缓存时间(按秒), 默认缓存七天,可自行调节
  static int MAX_CACHE_AGE = 7 * 24 * 60 * 60;

  /// 最大缓存条数(默认一百条)
  static int MAX_CACHE_COUNT = 100;

  static Service? _instance;
  static Dio _dio = Dio();
  Dio get dio => _dio;

  Service._internal() {
    _instance = this;
    _instance!._init();
  }

  factory Service() => _instance ?? Service._internal();

  static Service? getInstance() {
    _instance ?? Service._internal();
    return _instance;
  }

  /// 取消请求token
  CancelToken _cancelToken = CancelToken();

  _init() {
    /// 初始化基本选项
    BaseOptions options = BaseOptions(
        baseUrl: BASE_URL,
        connectTimeout: CONNECT_TIMEOUT,
        receiveTimeout: RECEIVE_TIMEOUT);

    /// 初始化dio
    _dio = Dio(options);
  }

  /// 开启日志打印
  void openLog() {
    // _dio.interceptors.add(LogInterceptor(responseBody: true));
  }

  /// 请求类
  Future<T> request<T>(
    String path, {
    DioMethod method = DioMethod.get,
    Map<String, dynamic>? params,
    data,
    CancelToken? cancelToken,
    Options? options,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
  }) async {
    const _methodValues = {
      DioMethod.get: 'get',
      DioMethod.post: 'post',
      DioMethod.put: 'put',
      DioMethod.delete: 'delete',
      DioMethod.patch: 'patch',
      DioMethod.head: 'head'
    };

    options ??= Options(method: _methodValues[method]);
    try {
      Response response;
      response = await _dio.request(path,
          data: data,
          queryParameters: params,
          cancelToken: cancelToken ?? _cancelToken,
          options: options,
          onSendProgress: onSendProgress,
          onReceiveProgress: onReceiveProgress);

      print("luchx ======> response.data: ${response.data}");
      return response.data;
    } on DioError catch (e) {
      throw e;
    }
  }

  /// 取消网络请求
  void cancelRequests({CancelToken? token}) {
    token ?? _cancelToken.cancel("cancelled");
  }
}
