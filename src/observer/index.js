/*
 * @Date: 2020-11-16 14:33:53
 * @LastEditors: pengfei
 * @LastEditTime: 2020-11-19 17:55:44
 */
import { defineProperty } from "../utils";
import { arrayMethods } from "./array";
import Dep from './dep';
class Observer {
  constructor(value) {
    // this.dep = new Dep();
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
function dependArray(value) { // 就是让里层数组收集外层数组的依赖，这样修改里层数组也可以
  for (let i = 0; i < value.length; i++) {
      let current = value[i];
      current.__ob__ && current.__ob__.dep.depend();
      if (Array.isArray(current)) {
          dependArray(current);
      }
  }
}
function defineReactive(data, key, value) {
  let childOb = observe(value); //如果值是对象继续监测
  let dep = new Dep(); // 每次都会给属性创建一个dep
  Object.defineProperty(data, key, {
    get() {
      console.log("用户取值了", data, key, value);
      if (Dep.target) {
        dep.depend(); // 让这个属性自己的dep记住这个watcher，也要让watcher记住这个dep

        // childOb 可能是对象 也可能是数组
        if (childOb) { // 如果对数组取值 会将当前的watcher和数组进行关联
            // childOb.dep.depend();
            if (Array.isArray(value)) {
                dependArray(value)
            }
        }
    }
      return value;
    },
    set(newValue) {
      console.log("设置值了", data, key, value, newValue);
      if (newValue === value) return;
      observe(newValue); //如果用户把值改成对象继续监控
      value = newValue;
      dep.notify(); //通知dep中记录的watcher让它去执行 
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
