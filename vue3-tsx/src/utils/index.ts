// 返回空对象
export const noop = () => {};

/**
 * 判断对象类型
 * @param [obj: any] 参数对象
 * @returns String
 */
export function isType(obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
}