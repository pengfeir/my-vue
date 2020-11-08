export function proxy(vm, data, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[data][key];
    },
    set(newValue) {
      vm[data][key] = newValue;
    },
  });
}
export function defineProperty(target, key, value) {
  Object.defineProperty(target, key, {
    enumerable: false, //不能枚举，不能循环出来，防止遍历value的时候被遍历出来
    configurable: false,
    value,
  });
}
