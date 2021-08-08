import Vnode from './vnode'
// c的可能性：
// 文本 数组 vnode
export default function h (tag, data, c) {
    if(typeof c === 'string' || typeof c === 'number') {
        return new Vnode(tag, data, undefined, c, undefined);
    } else if (Array.isArray(c)) {
        const children = c.map(ch => ch); // 收集
        return new Vnode(tag, data, children, undefined, undefined);
    } else if (c instanceof Vnode) {
        const children = [c];
        return new Vnode(tag, data, children, undefined, undefined);
    } else {
        throw new Error('你写错了')
    }
}

