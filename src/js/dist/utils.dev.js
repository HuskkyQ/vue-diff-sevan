"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTag = getTag;
exports.sameVnode = sameVnode;
exports.isUndef = isUndef;
exports.isDef = isDef;
exports.createKeyToOldIdx = createKeyToOldIdx;
exports.findIdxInOld = findIdxInOld;
exports.addVnodes = addVnodes;
exports.removeVnodes = removeVnodes;

var _createElement = _interopRequireDefault(require("./createElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getTag(el) {
  return el.tagName.toLowerCase();
}

function sameVnode(a, b) {
  return a.tag === b.tag && a.key === b.key && sameInputType(a, b);
}

function sameInputType(a, b) {
  if (a.tag === 'input' && b.tag === 'input') {
    if (a.type !== b.type) {
      return false;
    }
  }

  return true;
}

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }

  return map;
}

function findIdxInOld(node, oldCh, start, end) {
  for (var i = start; i < end; i++) {
    var c = oldCh[i];
    if (isDef(c) && sameVnode(node, c)) return i;
  }
} // function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
//     for (; startIdx <= endIdx; ++startIdx) {
//         createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx)
//     }
// }


function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx) {
  for (var i = startIdx; i <= endIdx; i++) {
    // 如果refElm为null，则会添加到最后一项 相当于appendChild
    parentElm.insertBefore((0, _createElement["default"])(vnodes[i]), refElm);
  }
}

function removeVnodes(vnodes, startIdx, endIdx) {
  var parentElm = null;

  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vnodes[startIdx];
    !parentElm && (parentElm = ch.elm.parentNode);
    parentElm && parentElm.removeChild(ch.elm);
  }
}