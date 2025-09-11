/**
 * 统一响应格式类
 */
export class ResponseMsg {
  constructor(
    public code: number,
    public msg: string,
    public data: any
  ) {}

  /**
   * 创建成功响应
   * @param data 响应数据
   * @param msg 响应消息
   * @returns ResponseMsg
   */
  static success(data: any, msg: string = '请求成功！') {
    return new ResponseMsg(200, msg, data)
  }

  /**
   * 创建失败响应
   * @param msg 错误消息
   * @param code 错误码，默认500
   * @returns ResponseMsg
   */
  static fail(msg: string, code: number = 500) {
    return new ResponseMsg(code, msg, null)
  }

  /**
   * 创建自定义响应
   * @param code 响应码
   * @param msg 响应消息
   * @param data 响应数据
   * @returns ResponseMsg
   */
  static custom(code: number, msg: string, data: any) {
    return new ResponseMsg(code, msg, data)
  }
}
