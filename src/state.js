/*
 * @Date: 2020-11-16 14:33:53
 * @LastEditors: pengfei
 * @LastEditTime: 2020-12-01 15:11:52
 */
import { observe } from "./observer/index";
import { proxy } from "./utils";
import Watcher from './observer/watcher';
import Dep from './observer/dep'
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
    initComputed(vm,opts.computed);
  }
  if (opts.watch) {
    initWatch(vm, opts.watch);
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
  observe(data);
}
function initComputed(vm,computed) {
  const watchers = vm._computedWatchers = Object.create(null)
  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
      watchers[key] = new Watcher(
        vm,
        getter || (()=>{}),
        ()=>{},
        { lazy: true }
      )
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } 
  }
}
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: ()=>{},
  set: ()=>{}
}
export function defineComputed (
  target,
  key,
  userDef
) {
  const shouldCache = true
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get =  shouldCache
    ? createComputedGetter(key)
    : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = ()=>{}
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : ()=>{}
    sharedPropertyDefinition.set = userDef.set || (()=>{})
  }
  console.log("target==========",target)
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      console.log('Dep.target',Dep.target)
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}
function initWatch(vm, watch) {
  for (const key in watch) {
    const handler = watch[key];
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}
var _toString = Object.prototype.toString;
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}
function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === "string") {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}
export function stateMixin (Vue) {

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    const vm = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    //增加标识，这是用户创建的watch
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        // handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }
  }
}

