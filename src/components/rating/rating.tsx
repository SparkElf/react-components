import { Children, CSSProperties, forwardRef, FunctionComponent, Suspense, useEffect, useRef, useState } from 'react'

import './rating.scss'
import SVG from '../../assets/code/star.svg' //需要SVGR的支持
import { render } from 'react-dom'

interface Props {
    Star?: any
    rating: number
    backgroundColor?: string
    color?: string
    size?: number
}

export const Rating = ({
    Star = SVG,
    color = 'gold',
    backgroundColor = 'gray',
    size = 30,
    rating
}: Props) => {
    const refs = useRef([])
    const [elements, setElements] = useState([])
    const [gradients, setGradients] = useState(null)
    useEffect(() => {
        let els = [], grads = []
        for (let i = 0; i < 5; i++) {
            els.push(<Star key={i} ref={el => { refs.current[i] = el }} width={size} height={size} ></Star>)
            if (rating - i < 1 && rating - i > 0) {
                let root = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                render(
                    <linearGradient id="gradient" x1="0" x2="100%" y1="0" y2="0">
                        <stop offset={(rating - i) * 100 + "%"} stopColor={color}></stop>
                        <stop offset={(rating - i) * 100 + "%"} stopColor={backgroundColor}></stop>
                    </linearGradient>
                    , root)
                setGradients(root)
            }
        }
        setElements(els)

    }, [Star, rating])
    useEffect(() => {
        if (elements.length !== 0) {
            for (let i = 0; i < Math.floor(rating); i++)
                refs.current[i].getElementsByTagName('path')[0].setAttribute('fill', color)
            refs.current[Math.floor(rating)].getElementsByTagName('path')[0].setAttribute('fill', 'url(#gradient)')
            refs.current[Math.floor(rating)].appendChild(gradients.firstChild.cloneNode(2))
            for (let i = Math.floor(rating) + 1; i < 5; i++)
                refs.current[i].getElementsByTagName('path')[0].setAttribute('fill', backgroundColor)
        }
    }, [elements])
    return (
        <div className='sparkelf rating'>
            {elements}
        </div>
    )
}