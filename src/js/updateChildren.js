import { 
  sameVnode,
  isUndef,
  isDef, 
  createKeyToOldIdx, 
  findIdxInOld, 
  addVnodes, 
  removeVnodes 
} from "./utils";
import patchVnode from './patchVnode';
import createElement from "./createElement";

export default function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // *命中一种就不会继续查询比较了
    if (isUndef(oldStartVnode)) { // 判断旧首是否为空
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) { // 判断旧尾是否为空
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) { // ① 旧首 新首比较
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) { // ② 旧尾 新尾 比较
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) { // ③ 旧首 新尾 比较
      // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode);
      // nodeOps.insertBefore(
      //   parentElm,
      //   oldStartVnode.elm,
      //   nodeOps.nextSibling(oldEndVnode.elm)
      // );
      // 将当前旧的子节点列表的开始节点 移动到结束节点之后
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) { // ④ 旧尾 新首 比较
      // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode);
      // nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      // 将当前旧的子节点列表的结束节点 移动到开始节点之前
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else { // 前四种比较都没得到相同节点 则遍历循环
      if (isUndef(oldKeyToIdx)) { // 旧的节点key和索引表是否为空 为空 进入；不为空 则直接使用
        // 意思是 第一次创建 后续可以使用 直到结束
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }

      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

      if (isUndef(idxInOld)) {
        // New element
        // createElm(
        //   newStartVnode,
        //   null,
        //   parentElm,
        //   oldStartVnode.elm
        // );
      } else {
        vnodeToMove = oldCh[idxInOld];
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(vnodeToMove, newStartVnode);
          oldCh[idxInOld] = undefined;
          // nodeOps.insertBefore(
          //   parentElm,
          //   vnodeToMove.elm,
          //   oldStartVnode.elm
          // );
        } else {
          // same key but different element. treat as new element
          // createElm(newStartVnode, insertedVnodeQueue, parentElm);
        }
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }

  if (oldStartIdx > oldEndIdx) { // 旧的节点列表先遍历完，说明新节点有剩余，需要创建
    refElm = isUndef(newCh[newEndIdx + 1]) // 判断该节点是否存为 undefined；
      ? null // 为空则赋值null
      : newCh[newEndIdx + 1].elm; // 不为空则取该节点的真实dom（null）
    
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    // 新节点列表已经遍历结束，此时需要删除旧节点列表的开始节点和结束节点之间的元素
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
}