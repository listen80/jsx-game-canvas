export default class EventEmitter {
  constructor(mixin) {
    this.event = {};
    this.mixin = mixin;
  }

  // 监听
  on(type, listener) {
    this.event[type] = this.event[type] || [];
    this.event[type].push(listener);
  }

  //发送监听
  emit(type, data) {
    this.event[type] = this.event[type] || [];
    this.event[type].forEach((fn) => fn.call(this, data, this.mixin));
  }

  //移除监听器
  off(type, listener) {
    this.event[type] = this.event[type] || [];
    const index = this.event[type].indexOf(listener);
    this.event[type].splice(index, 1);
  }

  registry(...events) {
    events.forEach((event) => {
      Object.entries(event).forEach(([key, value]) => {
        this.on(key, value);
      });
    });
  }
}
