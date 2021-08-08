export default class vnode{
    constructor(tag, data, children, text, elm) {
        this.tag = tag; // 元素标签
        this.data = data; // 属性
        this.children = children; // 子节点
        this.text = text; // 文本节点内容
        this.elm = elm; // 对应真实dom
    }
}