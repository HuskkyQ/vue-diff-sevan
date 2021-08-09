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

let vdom1 = h('div', {key: 'qw'}, [
    h('p', {key:'A'}, '哈哈哈'),
    h('p', {key:'B'}, '嘻嘻嘻'),
    h('p', {key:'F'}, '嗯嗯嗯')
])
// let vdom1 = h('section', {}, '你好啊a')
let vdom2 = h('div', {key: 'qw'}, [
    h('p', {key:'A'}, '哈哈哈'),
    h('p', {key:'B'}, '嘻嘻嘻'),
    h('p', {key:'C'}, [
        h('span', {key: '1'}, '摩西摩西 '),
        h('span', {key: '2'}, '八嘎牙路')
    ]),
    h('p', {key:'D'}, 'hello')
])

// renderDOM(vdom1, app)

patch(app, vdom1)

patch(vdom1, vdom2)