class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}
function defineReactive(data, key, value) {
  observe(value); //如果值是对象继续监测
  Object.defineProperty(data, key, {
    get() {
      console.log("用户取值了", data, key, value, Date.now());
      return value;
    },
    set(newValue) {
      console.log("设置值了", data, key, newValue, Date.now());
      if (newValue === value) return;
      observe(newValue); //如果用户把值改成对象继续监控
      value = newValue;
    },
  });
}
export function observe(data) {
  if (typeof data !== "object" && data !== null) {
    return;
  }
  return new Observer(data);
}
