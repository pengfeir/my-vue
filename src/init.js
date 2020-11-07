import { initState } from "./state";
//初始化的操作初始化

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;
    //初始化状态
    initState(vm);
  };
}
