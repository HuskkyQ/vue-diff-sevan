import Vnode from "./vnode"
import { getTag, sameVnode } from './utils'
import createElement from "./createElement";
import patchVnode from "./patchVnode";

export default function(oldVnode, newVnode) {
    if(!oldVnode.tag) {
        oldVnode = new Vnode(getTag(oldVnode), {}, [], undefined, oldVnode);
    }

    if(sameVnode(oldVnode, newVnode)) {
        patchVnode(oldVnode, newVnode)
    } else {
        // 不是同一个节点，暴力插入新节点，删除旧节点
        let newVnodeElm = createElement(newVnode);
        newVnodeElm && oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
}