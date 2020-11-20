/*
 * @Date: 2020-11-16 14:33:53
 * @LastEditors: pengfei
 * @LastEditTime: 2020-11-19 17:56:15
 */
let oldArrayProtoMethods = Array.prototype;
export let arrayMethods = Object.create(oldArrayProtoMethods);
let methods = ["push", "pop", "splice", "shift", "unshift", "reverse", "sort"];
methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    const result = oldArrayProtoMethods[method].apply(this, args);
    let inserted;
    let ob = this.__ob__;
    switch (method) {
      //a:[1,2]a.push({name:1}) 数组追加的时候可能是对象，应该再次被劫持
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    if (inserted) ob.observeArray(args);
    // ob.dep.notify();
    return result;
  };
});
