/*
 * @Date: 2020-01-07 21:14:59
 * @LastEditTime : 2020-01-07 21:21:50
 * @Description: 脱离业务逻辑的 工具类
 */
export default class utils {
  /**
   * 根据时间进行节流，防止一定时间内多次触发
   * @param {Function} fn 函数方法
   * @param {Number} delay 时间
   */
  static throttle(fn: { call: (arg0: any, arg1: IArguments) => void }, delay = 1000) {
    var prev = Date.now();
    return function() {
      var context = this,
        args = arguments;
      var now = Date.now();
      if (now - prev > delay) {
        fn.call(context, args);
        prev = Date.now();
      }
    };
  }
  /**
   * 防抖 触发后一定时间内不会再次触发，如果一直运行则一直重置setTimeout 延时操作
   * @param {Function} fn
   * @param {Number} interval 时间
   */
  static debounce(fn: { call: (arg0: any, arg1: IArguments) => void }, interval: number) {
    var timer: number;
    var gapTime = interval || 1000;
    return function() {
    //   console.log('-----------------------------', arguments);
      clearTimeout(timer);
      var context = this,
        args = arguments;
      timer = setTimeout(function() {
        fn.call(context, args);
      }, gapTime);
    };
  }
}
