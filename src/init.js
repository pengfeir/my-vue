/*
 * @Date: 2020-11-16 14:33:53
 * @LastEditors: pengfei
 * @LastEditTime: 2020-11-17 17:04:48
 */
import { compileToFunction } from "./compiler/index";
import { initState } from "./state";
import { mountComponent, callHook} from './lifecycle';
import { mergeOptions} from './utils';
//初始化的操作初始化

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    // vm.$options = options;
    // 全局组件和局部组件的区别？为什么
    // 全局组件init的时候会挂在vue上
    //初始化状态
    vm.$options = mergeOptions(vm.constructor.options, options);
       console.log(vm.$options);
       // 初始化状态
       callHook(vm, 'beforeCreate');
       initState(vm);
       callHook(vm, 'created');
    if (vm.$options.el) {
      // 数据可以挂载到页面上
      vm.$mount(vm.$options.el);
    }
  };
  Vue.prototype.$mount = function (el) {
    el = document.querySelector(el);
    const vm = this;
    const options = vm.$options;
    vm.$el = el;
    // 如果有render 就直接使用render
    // 没有render 看有没有template属性
    // 没有template 就接着找外部模板
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
      }
      // 如何将模板编译成render函数
      const render = compileToFunction(template);
      options.render = render;
    }
    mountComponent(vm, el);
  };
}
//vue数据更新是以组件为单位的，给每个组件增加一个watcher
