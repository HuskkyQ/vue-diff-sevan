import h from'./js/h'
import patch from './js/patch'
import renderDOM from './js/renderDOM'

// let vDom = h('div', {}, '你好')
// let vDom = h('div', {}, [
//     h('p', {}, '哈哈哈'),
//     h('p', {}, '嘻嘻嘻'),
//     h('p', {}, '嗯嗯嗯')
// ])
// let vDom = h('div', {}, h('span', {}, '你好哟'))


const app = document.getElementById('app')

let vdom1 = h('section', {}, [
    h('p', {}, '哈哈哈'),
    h('p', {}, '嘻嘻嘻'),
    h('p', {}, '嗯嗯嗯')
])
let vdom2 = h('section', {}, [
    h('p', {}, '哈哈哈'),
    h('p', {}, '嘻嘻嘻'),
    h('p', {}, [
        h('span', {}, '摩西摩西'),
        h('span', {}, '八嘎牙路')
    ]),
    h('p', {}, 'hello')
])

// renderDOM(vdom1, app)

patch(app, vdom1)