import axios from './config';
import {
  isNotEmpty,
} from '@/utils';
import {
  local
} from '@/utils/storage';
import requestValidator from '@/validator';

// HTTP工具类
export default class Http {
  public static async request(params: any, descriptor ?: any) {
    // 添加请求拦截校验
    if (descriptor !== undefined) {
      let fileds = descriptor.fileds || {};
      let rules = descriptor.rules || {};
      await requestValidator(fileds, rules);
    }
    local.set('lastRequestParams', params);
    const res = await axios(params);
    const data = res.data;
    const hasData = typeof data.data !== 'undefined' ? data.data : data;
    // 由于当前后台返回格式不一致,所以需要手动重组数据结构
    /**
     1. 直接返回response数据, 不包含status, data
     */
    const response = isNotEmpty(data) && typeof data.status === 'undefined' && typeof data.data === 'undefined';
    /**
     2. response数据只包含status
     */
    const hasStatus = isNotEmpty(data) && typeof data.status !== 'undefined' && typeof data.data === 'undefined';
    /**
     3. 正常返回需要的结构, 包含status, data
     */
    const normal = isNotEmpty(data) && typeof data.status !== 'undefined' && typeof data.data !== 'undefined';
    /**
      4. 判断当前status状态
     */
    const status = response ? response : hasStatus ? data.status : (normal && data.status);
    /**
      5. 返回自定义数据结构
     */
    const formaterData = {
      status,
      data: hasData,
      message: data.message ? data.message : (data.msg ? data.msg : (status ? 'request success' : 'request fail')),
    };
    return formaterData;
  }

  /**
   * get
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  public static get(req: any, descriptor ?: any): any {
    return this.request({
      method: 'GET',
      url: `/${req.url}`,
      params: req.data,
    }, descriptor);
  }

  /**
   * put
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  public static put(req: any, descriptor ?: any): any {
    return this.request({
      method: 'PUT',
      url: `/${req.url}`,
      data: req.data,
    }, descriptor);
  }

  /**
   * post
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  public static post(req: any, descriptor ?: any): any {
    return this.request({
      method: 'post',
      url: `/${req.url}`,
      data: req.data,
    }, descriptor);
  }

  /**
   * delete
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  public static delete(req: any, descriptor ?: any): any {
    return this.request({
      method: 'DELETE',
      url: `/${req.url}`,
      params: req.data,
    }, descriptor);
  }
}