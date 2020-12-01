/*
 * @Date: 2020-12-01 11:56:07
 * @LastEditors: pengfei
 * @LastEditTime: 2020-12-01 12:30:59
 */
async function foo() {
  await bar();
  console.log("async1 end");
}

async function errorFunc() {
  try {
    await Promise.reject("error!!!");
  } catch (e) {
    console.log(e);
  }
  console.log("async1");
  return Promise.resolve("async1 success");
}
foo();
errorFunc().then((res) => console.log(res));

function bar() {
  console.log("async2 end");
}
// console.log("async2 end");
// console.log("async1 end");
async2
// async1
// async1 success
// error