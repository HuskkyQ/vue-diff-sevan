"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateChildren;

var _utils = require("./utils");

var _patchVnode = _interopRequireDefault(require("./patchVnode"));

var _createElement = _interopRequireDefault(require("./createElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function updateChildren(parentElm, oldCh, newCh) {
  var oldStartIdx = 0;
  var newStartIdx = 0;
  var oldEndIdx = oldCh.length - 1;
  var oldStartVnode = oldCh[0];
  var oldEndVnode = oldCh[oldEndIdx];
  var newEndIdx = newCh.length - 1;
  var newStartVnode = newCh[0];
  var newEndVnode = newCh[newEndIdx];
  var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // *命中一种就不会继续查询比较了
    if ((0, _utils.isUndef)(oldStartVnode)) {
      // 判断旧首是否为空
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
    } else if ((0, _utils.isUndef)(oldEndVnode)) {
      // 判断旧尾是否为空
      oldEndVnode = oldCh[--oldEndIdx];
    } else if ((0, _utils.sameVnode)(oldStartVnode, newStartVnode)) {
      // ① 旧首 新首比较
      (0, _patchVnode["default"])(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if ((0, _utils.sameVnode)(oldEndVnode, newEndVnode)) {
      // ② 旧尾 新尾 比较
      (0, _patchVnode["default"])(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if ((0, _utils.sameVnode)(oldStartVnode, newEndVnode)) {
      // ③ 旧首 新尾 比较
      // Vnode moved right
      (0, _patchVnode["default"])(oldStartVnode, newEndVnode); // nodeOps.insertBefore(
      //   parentElm,
      //   oldStartVnode.elm,
      //   nodeOps.nextSibling(oldEndVnode.elm)
      // );
      // 将当前旧的子节点列表的开始节点 移动到结束节点之后

      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if ((0, _utils.sameVnode)(oldEndVnode, newStartVnode)) {
      // ④ 旧尾 新首 比较
      // Vnode moved left
      (0, _patchVnode["default"])(oldEndVnode, newStartVnode); // nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      // 将当前旧的子节点列表的结束节点 移动到开始节点之前

      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 前四种比较都没得到相同节点 则遍历循环
      if ((0, _utils.isUndef)(oldKeyToIdx)) {
        // 旧的节点key和索引表是否为空 为空 进入；不为空 则直接使用
        // 意思是 第一次创建 后续可以使用 直到结束
        oldKeyToIdx = (0, _utils.createKeyToOldIdx)(oldCh, oldStartIdx, oldEndIdx);
      }

      idxInOld = (0, _utils.isDef)(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : (0, _utils.findIdxInOld)(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

      if ((0, _utils.isUndef)(idxInOld)) {// New element
        // createElm(
        //   newStartVnode,
        //   null,
        //   parentElm,
        //   oldStartVnode.elm
        // );
      } else {
        vnodeToMove = oldCh[idxInOld];

        if ((0, _utils.sameVnode)(vnodeToMove, newStartVnode)) {
          (0, _patchVnode["default"])(vnodeToMove, newStartVnode);
          oldCh[idxInOld] = undefined; // nodeOps.insertBefore(
          //   parentElm,
          //   vnodeToMove.elm,
          //   oldStartVnode.elm
          // );
        } else {// same key but different element. treat as new element
            // createElm(newStartVnode, insertedVnodeQueue, parentElm);
          }
      }

      newStartVnode = newCh[++newStartIdx];
    }
  }

  if (oldStartIdx > oldEndIdx) {
    // 旧的节点列表先遍历完，说明新节点有剩余，需要创建
    refElm = (0, _utils.isUndef)(newCh[newEndIdx + 1]) // 判断该节点是否存为 undefined；
    ? null // 为空则赋值null
    : newCh[newEndIdx + 1].elm; // 不为空则取该节点的真实dom（null）

    (0, _utils.addVnodes)(parentElm, refElm, newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    // 新节点列表已经遍历结束，此时需要删除旧节点列表的开始节点和结束节点之间的元素
    (0, _utils.removeVnodes)(oldCh, oldStartIdx, oldEndIdx);
  }
}