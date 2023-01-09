export default class EventEmitter {
  constructor() {
    this.event = {};
  }

  // 监听
  on(type, listener) {
    this.event[type] = this.event[type] || [];
    this.event[type].push(listener);
  }

  //发送监听
  emit(type, ...rest) {
    this.event[type] = this.event[type] || [];
    this.event[type].map((fn) => fn.apply(this, rest));
  }

  //移除监听器
  off(type, listener) {
    this.event[type] = this.event[type] || [];
    const index = this.event[type].indexOf(listener)
    this.event[type].splice(index, 1)
  }
}
