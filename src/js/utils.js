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

export {
    getTag,
    sameVnode
}