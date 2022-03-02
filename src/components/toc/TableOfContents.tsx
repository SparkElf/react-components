import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import './TableOfContents.styl'
interface Props {
    getHeadingElements?: () => any[]
    getNestedHeadings?: (array: any[]) => any
    select: string
    onSelect: (node) => void
}
export const TableOfContents = ({
    getHeadingElements = getHeadingElementsDefault,
    getNestedHeadings = getNestedHeadingsDefault,
    select,
    onSelect
}: Props) => {//该组件必须等文章加载结束后再渲染
    const nestedHeadings = useHeadings(getHeadingElements, getNestedHeadings, onSelect)[0]
    const renderTOCNodes = useMemo(() => function (node) {
        if (node.children.length == 0)//叶子节点
            return <a href={`#${node.domNode.id}`} className={node.domNode.id == select ? "active" : ""} onClick={() => onSelect(node)}>{node.domNode.innerText}</a>

        let jsxNodes = []
        for (let i = 0; i < node.children.length; i++)
            jsxNodes.push(
                <li>{renderTOCNodes(node.children[i])}</li>
            )
        //递归完成
        return (
            <>
                {node.domNode == null ? null : <a href={`#${node.domNode.id}`} className={node.domNode.id == select ? "active" : ""} onClick={
                    () => onSelect(node)
                }>{node.domNode.innerText}</a>
                }
                <ul>
                    {jsxNodes}
                </ul>
            </>
        )
    }, [])
    return (
        <nav className='toc'>
            <div className='header'>目录</div>
            {nestedHeadings == null ? null : renderTOCNodes(nestedHeadings)}
        </nav>
    );

}
//TODO 异步组件待优化
const useHeadings = (getHeadingElements, getNestedHeadings, onSelect) => {
    const [nestedHeadings, setNestedHeadings] = useState(null);
    const [activedId, setActivedId] = useState(0)
    const visbleHeadings = useState(new Map())[0]
    const indexMap = useState(new Map())[0]
    useEffect(() => {
        const headingElements = getHeadingElements() as any[]
        const newNestedHeadings = getNestedHeadings(headingElements);//自己决定嵌套方式
        setNestedHeadings(newNestedHeadings);

        for (let i = 0; i < headingElements.length; i++)//根据id找到标题在文章中按从上到下排列的顺序所处的位置
            indexMap.set(headingElements[i].id, i)

        //元素的可见性发生了变化，考察当前所有可见的元素，选择一个最上方的标题作为当前标题，否则如果当前没有可见元素则不做任何处理 这里由于需要频繁查找元素是否在visbleHeading中，所以visbleHeading应该用哈希表作为数据结构
        const observer = new IntersectionObserver((headings) => {
            headings.forEach(el => {
                if (el.isIntersecting && visbleHeadings.get(el.target.id) == null) //元素可见并且没有被记录
                    visbleHeadings.set(el.target.id, el)
                else if (!el.isIntersecting)
                    visbleHeadings.delete(el.target.id)
                let index = Number.POSITIVE_INFINITY
                visbleHeadings.forEach(el => {
                    let newIndex = indexMap.get(el.target.id)
                    if (newIndex < index)
                        index = newIndex
                })
                if (index != Number.POSITIVE_INFINITY)
                    onSelect(headingElements[index])
            })

        }, {
            rootMargin: '-110px 0px -40% 0px'
        })

        headingElements.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, []);

    return [nestedHeadings, setNestedHeadings];
}
const getNestedHeadingsDefault = (headingElements) => {
    const nestedHeadings = {
        parent: null,
        children: []
    };
    let rank = {
        "H1": 1, "H2": 2, "H3": 3, "H4": 4, "H5": 5, "H6": 6,
    }
    let curNode: any = nestedHeadings
    headingElements.forEach((heading, index) => {
        heading.id = "spark-toc-" + index//注意js默认引用，这个操作会直接修改dom元素
        while (curNode.parent != null && rank[curNode.domNode.nodeName] >= rank[heading.nodeName])//回溯
            curNode = curNode.parent
        let node = {
            parent: curNode,
            domNode: heading,
            children: []
        }
        curNode.children.push(node)
        curNode = node
    });
    return nestedHeadings
};
const getHeadingElementsDefault = () => {
    let postNode = document.querySelector(".article .content")
    return Array.from(postNode.querySelectorAll("h1,h2,h3,h4,h5"))//转换为数组方便使用map操作
}

