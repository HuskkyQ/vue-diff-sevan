import createElement from "./createElement";
import updateChildren from "./updateChildren";

export default function patchVnode(oldVnode, newVnode) {
    if (oldVnode === newVnode) return
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
            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
        } else {
            // 老vnode没有子节点 新的有
            oldVnode.elm.innerHTML = ''; // 需要先清空老vnode的文本节点 再添加新的节点
            for (let i = 0; i < newVnode.children.length; i++) {
                let newDOM = createElement(newVnode.children[i]);
                oldVnode.elm.appendChild(newDOM);
            }
        }
    }
    patchProps(oldVnode, newVnode);
}

function patchProps(oldVnode, newVnode) {
    const oldProps = oldVnode.data;
    const newProps = newVnode.data;
    for(let prop in oldProps) {
        if(newProps[prop]) {
            if(prop === 'value') {
                if(oldVnode.tag === 'input' || oldVnode.tag === 'textarea') {
                    oldVnode.elm.value = newProps[prop];
                } else {
                    oldVnode.elm.setAttribute(prop, newProps[prop]);
                }
            } else if (prop === 'style') {
                oldVnode.elm.style.cssText = newProps[prop];
            } else {
                oldVnode.elm.setAttribute(prop, newProps[prop]);
            }
        } else {
            oldVnode.elm.removeAttribute(prop)
        }
    }
}