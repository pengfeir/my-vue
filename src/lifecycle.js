/*
 * @Date: 2020-11-16 14:42:47
 * @LastEditors: pengfei
 * @LastEditTime: 2020-11-19 17:48:24
 */
import { patch } from "./vdom/patch";
import Watcher from './observer/watcher';
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    // 将虚拟节点转换成真实的dom
    const vm = this;
    // 首次渲染 需要用虚拟节点 来更新真实的dom

    // 初始化渲染的时候 会创建一个新节点并且将老节点删除

    // 1.第一次渲染完毕后 拿到新的节点，下次渲染时替换上次渲染的结果

    // 第一次初始化 第二次走diff算法
    const prevVnode = vm._vnode; // 先取上一次的vnode 看下一次是否有
    vm._vnode = vnode;  // 保存上一次的虚拟节点
    if (!prevVnode) {
        vm.$el = patch(vm.$el, vnode); // 组件调用patch方法后会产生$el属性    
    } else {
        vm.$el = patch(prevVnode, vnode);
    }
  };
}
export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
      handlers.forEach(handler => handler.call(vm));
  }
}
export function mountComponent(vm, el) {
  // 默认Vue是通过watcher来进行渲染  = 渲染watcher （每一个组件都有一个渲染watcher）
  callHook(vm,'beforeMount')
  let updateComponent = () => {
    console.log('updateComponent*****************')
    vm._update(vm._render()); // 把虚拟节点渲染成真正的节点
  };
  // 每次数据变化 就执行 updateComponent 方法 进行更新操作
  new Watcher(vm, updateComponent, () => {}, true);
  callHook(vm,'mounted')
  // new Watcher(vm, updateComponent, ()=>{ }, true) // updateComponent();
}
