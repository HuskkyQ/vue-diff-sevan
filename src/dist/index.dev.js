"use strict";

var _h = _interopRequireDefault(require("./js/h"));

var _patch = _interopRequireDefault(require("./js/patch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// let vDom = h('div', {}, '你好')
// let vDom = h('div', {}, [
//     h('p', {}, '哈哈哈'),
//     h('p', {}, '嘻嘻嘻'),
//     h('p', {}, '嗯嗯嗯')
// ])
// let vDom = h('div', {}, h('span', {}, '你好哟'))
var app = document.getElementById('app');
var vdom1 = (0, _h["default"])('div', {
  key: 'qw',
  style: 'width: 300px; height: 400px; background: lightblue;'
}, [(0, _h["default"])('p', {
  key: 'A',
  "class": 'item'
}, '哈哈哈'), (0, _h["default"])('p', {
  key: 'B',
  "class": 'item'
}, '嘻嘻嘻'), (0, _h["default"])('p', {
  key: 'F',
  "class": 'item'
}, '嗯嗯嗯')]); // let vdom1 = h('section', {}, '你好啊a')

var vdom2 = (0, _h["default"])('div', {
  key: 'qw',
  style: 'width: 400px; height: 300px; background: lightblue;'
}, [(0, _h["default"])('p', {
  key: 'A',
  "class": 'item-wrap'
}, '哈哈哈'), (0, _h["default"])('p', {
  key: 'B',
  "class": 'item'
}, '嘻嘻嘻'), (0, _h["default"])('p', {
  key: 'C'
}, [(0, _h["default"])('span', {
  key: '1'
}, '摩西摩西 '), (0, _h["default"])('span', {
  key: '2'
}, '八嘎牙路')]), (0, _h["default"])('p', {
  key: 'D'
}, 'hello')]); // renderDOM(vdom1, app)

var btn = document.getElementById('btn');

btn.onclick = function () {
  (0, _patch["default"])(vdom1, vdom2);
};

(0, _patch["default"])(app, vdom1);