/*
 * @Date: 2020-11-16 14:33:53
 * @LastEditors: pengfei
 * @LastEditTime: 2020-11-17 15:23:23
 */
import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./render";
import {initGlobalAPI} from './global-api/index'
//此文件在构造函数原型上扩展方法

// options Api
// MVVM 数据变化更新视图，视图变化数据会被影响（mvvm）,
// 不能跳过数据去更新视图，比如vue $ref可以操作dom更新，所以vue不是mvvm
function Vue(options) {
  this._init(options);
}
initMixin(Vue);
lifecycleMixin(Vue); // 扩展update方法 更新逻辑
renderMixin(Vue); // 扩展_render方法，调用render方法的逻辑
initGlobalAPI(Vue) // 混合全局的API
export default Vue;
