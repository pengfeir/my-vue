/*
 * @Date: 2020-11-16 14:42:47
 * @LastEditors: pengfei
 * @LastEditTime: 2020-11-16 17:50:01
 */
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {};
}
export function mountComponent(vm, el) {
  // 默认Vue是通过watcher来进行渲染  = 渲染watcher （每一个组件都有一个渲染watcher）
  let updateComponent = () => {
    vm._update(vm._render()); // 把虚拟节点渲染成真正的节点
  };
  updateComponent();
  // new Watcher(vm, updateComponent, ()=>{ }, true) // updateComponent();
}
