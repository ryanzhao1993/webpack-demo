// import _ from 'lodash';
import printMe from '@/print';
import {cube} from '@/math';
import '@/style.css';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    element.classList.add('hello');
    // element.innerHTML = _.join(['Hello', 'webpack', cube(5)], ' ');
    element.innerHTML = 'test tree shaking' + cube(5);

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);
    return element;

}
let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        document.body.removeChild(element);
        element = component(); // 重新渲染页面后，component 更新 click 事件处理
        document.body.appendChild(element);
    })
}
