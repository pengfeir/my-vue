import { initMixin } from "./init";
//此文件在构造函数原型上扩展方法

// options Api
// MVVM 数据变化更新视图，视图变化数据会被影响（mvvm）,
// 不能跳过数据去更新视图，比如vue $ref可以操作dom更新，所以vue不是mvvm
function Vue(options) {
  this._init(options);
}
initMixin(Vue);
export default Vue;
