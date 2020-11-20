/*
 * @Date: 2020-11-16 14:59:11
 * @LastEditors: pengfei
 * @LastEditTime: 2020-11-16 17:49:23
 */
import { generate } from "./generate";
import { parseHTML } from "./parse";
export function compileToFunction(template) {
  let ast = parseHTML(template); //html转换成
  let code = generate(ast); //生成ast语法树
  let render = `with(this){return ${code}}`; //with语法给template传参数
  let fn = new Function(render); // 可以让字符串变成一个函数
  return fn;
}
