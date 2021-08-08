import Vnode from "./vnode"
import { getTag, sameVnode } from './utils'
import createElement from "./createElement";

export default function(oldVnode, newVnode) {
    if(!oldVnode.tag) {
        oldVnode = new Vnode(getTag(oldVnode), {}, [], undefined, oldVnode);
    }

    if(sameVnode(oldVnode, newVnode)) {
        console.log('是同一个节点')
    } else {
        // 不是同一个节点，暴力插入新节点，删除旧节点
        let newVnodeElm = createElement(newVnode);
        newVnodeElm && oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
}