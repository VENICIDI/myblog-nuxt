// 全局类型声明

declare global {
  var sseConnections: Map<string, ReadableStreamDefaultController> | undefined;
}

export {};
