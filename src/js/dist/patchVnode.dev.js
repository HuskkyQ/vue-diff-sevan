"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = patchVnode;

var _createElement = _interopRequireDefault(require("./createElement"));

var _updateChildren = _interopRequireDefault(require("./updateChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function patchVnode(oldVnode, newVnode) {
  if (oldVnode === newVnode) return;

  if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
    // 新vnode有text属性
    if (newVnode.text !== oldVnode.text) {
      // 如果两者的text不同，如果老的vnode有children节点，也会立即消失
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 新vnode不是text节点 有children节点
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 新老都有vnode有子节点
      newVnode.elm = oldVnode.elm;
      (0, _updateChildren["default"])(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      // 老vnode没有子节点 新的有
      oldVnode.elm.innerHTML = ''; // 需要先清空老vnode的文本节点 再添加新的节点

      for (var i = 0; i < newVnode.children.length; i++) {
        var newDOM = (0, _createElement["default"])(newVnode.children[i]);
        oldVnode.elm.appendChild(newDOM);
      }
    }
  }
}