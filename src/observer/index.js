import { defineProperty } from "../utils";
import { arrayMethods } from "./array";

class Observer {
  constructor(value) {
    defineProperty(value, "__ob__", this);
    //判断是否数组，数组的话不添加拦截，因为数组太长的话会导致性能很差，
    // 一般操作数组shift,push,slice,所以拦截这些方法
    if (Array.isArray(value)) {
      //函数劫持，切片编程
      value.__proto__ = arrayMethods;
      //解决数组里面就有对象没加上get,set这种情况b: [1, { a: 1 }],a上就没有get,set
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  observeArray(value) {
    value.forEach((item) => {
      observe(item);
    });
  }
  walk(value) {
    let keys = Object.keys(value);
    console.log("keys", keys, value);
    keys.forEach((key) => {
      defineReactive(value, key, value[key]);
    });
  }
}
function defineReactive(data, key, value) {
  observe(value); //如果值是对象继续监测
  Object.defineProperty(data, key, {
    get() {
      console.log("用户取值了", data, key, value);
      return value;
    },
    set(newValue) {
      console.log("设置值了", data, key, value, newValue);
      if (newValue === value) return;
      observe(newValue); //如果用户把值改成对象继续监控
      value = newValue;
    },
  });
}
export function observe(data) {
  if (typeof data !== "object" && data !== null) {
    return;
  }
  if (data.__ob__) return;
  return new Observer(data);
}
