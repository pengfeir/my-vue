/*
 * @Date: 2020-11-18 13:59:14
 * @LastEditors: pengfei
 * @LastEditTime: 2020-12-01 14:47:42
 */
let id = 0
class Dep {
    constructor() {
        this.id = id++;
        this.subs = [];
    }
    depend(){
        // 1. 让dep 记住watcher
        // 2. 让watcher 记住dep 双向记忆
        if (Dep.target) {
          Dep.target.addDep(this)// 让watcher 存储dep
        }
    }
    addSub(watcher){
        this.subs.push(watcher);
    }
    notify(){
        this.subs.forEach(watcher=>watcher.update())
    }
}
Dep.target = null; // 默认target是空的
const stack = [];
export function pushTarget(watcher) {
    // Dep.target = watcher
     stack.push(watcher) // []
     Dep.target = watcher
}

export function popTarget() {
    // Dep.target = null;
      stack.pop();
      Dep.target = stack[stack.length-1];
}


export default Dep;
// dep 和 watcher 是一个多对多的关系
// 每个属性 都有一个dep属性 ，dep 存放着watcher  一个dep中有多个watcher ，一个watcher可能被多个属性所依赖