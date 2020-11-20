/*
 * @Date: 2020-11-16 14:33:53
 * @LastEditors: pengfei
 * @LastEditTime: 2020-11-19 16:50:48
 */
import { observe } from "./observer/index";
import { proxy } from "./utils";
export function initState(vm) {
  const opts = vm.$options;
  if (opts.props) {
    initProps(vm);
  }
  if (opts.methods) {
    initMethods(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
}
function initProps() {}
function initMethods() {}
function initData(vm) {
  let data = vm.$options.data;
  vm._data = data = typeof data === "function" ? data.call(vm) : data;
  for (let key in data) {
    proxy(vm, "_data", key);
  }
  console.log(data,"********")
  observe(data);
}
function initComputed() {}
function initWatch() {}
