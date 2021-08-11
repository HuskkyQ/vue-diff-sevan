// 创建真正的dom节点
export default function createElement(vnode) {
    const domNode = document.createElement(vnode.tag); // 当前创建的节点
    Object.entries(vnode.data).forEach(([k, v]) => {
        if (k === 'value') {
            if(vnode.tag === 'input' || vnode.tag === 'textarea') {
                domNode.value = v
            } else {
                domNode.setAttribute(k, v)
            }
        } else if (k === 'style') {
            domNode.style.cssText = v
        } else {
            domNode.setAttribute(k, v)
        }
    })

    
    // 子节点还是文本节点
    if(vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
        domNode.innerText = vnode.text;
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 存在子节点 递归子节点
        vnode.children.map(ch => {
            let chDOM = createElement(ch);
            domNode.appendChild(chDOM); // 给当前节点增加子节点
        })
    }
    // 添加elm属性
    vnode.elm = domNode; // 处理完真实dom之后要把它赋值给虚拟dom的elm属性 方便映射查找
    return domNode;
}