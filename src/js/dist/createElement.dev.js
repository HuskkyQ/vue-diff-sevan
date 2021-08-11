"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createElement;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// 创建真正的dom节点
function createElement(vnode) {
  var domNode = document.createElement(vnode.tag); // 当前创建的节点

  Object.entries(vnode.data).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    if (k === 'value') {
      if (vnode.tag === 'input' || vnode.tag === 'textarea') {
        domNode.value = v;
      } else {
        domNode.setAttribute(k, v);
      }
    } else if (k === 'style') {
      domNode.style.cssText = v;
    } else {
      domNode.setAttribute(k, v);
    }
  }); // 子节点还是文本节点

  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 存在子节点 递归子节点
    vnode.children.map(function (ch) {
      var chDOM = createElement(ch);
      domNode.appendChild(chDOM); // 给当前节点增加子节点
    });
  } // 添加elm属性


  vnode.elm = domNode; // 处理完真实dom之后要把它赋值给虚拟dom的elm属性 方便映射查找

  return domNode;
}