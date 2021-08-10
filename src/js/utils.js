import createElement from "./createElement";

function getTag(el) {
    return el.tagName.toLowerCase();
}

function sameVnode(a, b) {
    return a.tag === b.tag && a.key === b.key && sameInputType(a, b)
}

function sameInputType(a, b) {
    if(a.tag === 'input' && b.tag === 'input') {
        if(a.type !== b.type) {
            return false;
        }
    }
    return true
}

function isUndef (v) {
    return v === undefined || v === null
}

function isDef (v) {
    return v !== undefined && v !== null
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
    let i, key
    const map = {}
    for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key
        if (isDef(key)) map[key] = i
    }
    return map
}

function findIdxInOld (node, oldCh, start, end) {
    for (let i = start; i < end; i++) {
        const c = oldCh[i]
        // 返回第一个可以复用的旧节点（旧节点的key也一定会是null）
        if (isDef(c) && sameVnode(node, c)) return i
    }
}

function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx) {
    for (let i = startIdx; i <= endIdx; i++) {
        // 如果refElm为null，则会添加到最后一项 相当于appendChild
        parentElm.insertBefore(createElement(vnodes[i]), refElm)
    }
}

function removeVnodes(vnodes, startIdx, endIdx) {
    let parentElm = null;
    for (; startIdx <= endIdx; ++startIdx) {
        let ch = vnodes[startIdx];
        !parentElm && (parentElm = ch.elm.parentNode)
        parentElm && parentElm.removeChild(ch.elm)
    }
}

export {
    getTag,
    sameVnode,
    isUndef,
    isDef,
    createKeyToOldIdx,
    findIdxInOld,
    addVnodes,
    removeVnodes
}