/*
 * @Date: 2020-11-16 14:33:53
 * @LastEditors: pengfei
 * @LastEditTime: 2020-11-16 15:26:54
 */
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
function makeUp(str) {
  const map = {

  }
  str.split(',').forEach(tagName => {
      map[tagName] = true;
  })
  return (tag)=> map[tag] || false;
}

export const isReservedTag = makeUp('a,p,div,ul,li,span,input,button')
export const isObject = (val) => typeof val == 'object' && val != null
