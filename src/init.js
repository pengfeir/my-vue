/*
 * @Date: 2020-11-16 14:33:53
 * @LastEditors: pengfei
 * @LastEditTime: 2020-11-16 17:41:43
 */
import { compileToFunction } from "./compiler/index";
import { mountComponent } from "./lifecycle";
import { initState } from "./state";
//初始化的操作初始化

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;
    //初始化状态
    initState(vm);
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
      // console.log(template);
      // 如何将模板编译成render函数
      const render = compileToFunction(template);
      options.render = render;
      console.log(options.render);
    }
    mountComponent(vm, el);
  };
}
