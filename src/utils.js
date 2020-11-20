/*
 * @Date: 2020-11-16 14:33:53
 * @LastEditors: pengfei
 * @LastEditTime: 2020-11-17 16:45:08
 */
export function proxy(vm, data, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[data][key];
    },
    set(newValue) {
      vm[data][key] = newValue;
    },
  });
}
export function defineProperty(target, key, value) {
  Object.defineProperty(target, key, {
    enumerable: false, //不能枚举，不能循环出来，防止遍历value的时候被遍历出来
    configurable: false,
    value,
  });
}
function makeUp(str) {
  const map = {

  }
  str.split(',').forEach(tagName => {
      map[tagName] = true;
  })
  return (tag)=> map[tag] || false;
}

export const isReservedTag = makeUp('a,p,div,ul,li,span,input,button')
export const isObject = (val) => typeof val == 'object' && val != null
const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
]
const strats = {};

strats.data = function(parentVal, childVal) {
  return childVal
}
strats.components = function(parentVal, childVal) {
    const res = Object.create(parentVal);
    if (childVal) {
        for(let key in childVal) {
            res[key] = childVal[key]
        }
    }
    return res;
}

function mergeHook(parentVal, childVal) {
    if (childVal) { // 如果
        if (parentVal) {
            return parentVal.concat(childVal);
        } else { // 如果儿子有父亲没有
            return [childVal]
        }
    } else {
        return parentVal; // 儿子没有直接采用父亲
    }
}

LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook;
})
export function mergeOptions(parent, child) {
  const options = {};
  // {a: 1} {a: 2} => {a: 2}
  // {a: 1} {} => {a: 1}
  // 自定义的策略
  // 1.如果父亲有的儿子也有，应该用儿子替换父亲
  // 2.如果父亲优儿子没有，用父亲的
  for (let key in parent) {
      mergeField(key)
  }

  for (let key in child) {
      if (!parent.hasOwnProperty(key)) {
          mergeField(key);
      }
  }

  function mergeField(key) {
      // 策略模式
      if (strats[key]) {
          return options[key] = strats[key](parent[key], child[key]);
      }


      if (isObject(parent[key]) && isObject(child)[key]) { // 父子的值都是对象
          options[key] = { ...parent[key], ...child[key] }
      } else {
          if (child[key]) { // 如果儿子有值
              options[key] = child[key];
          } else {
              options[key] = parent[key];
          }
      }
  }
  return options;
}