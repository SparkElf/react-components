import { lazy, Suspense, useEffect, useState } from "react"
import s from '../../assets/code/star.svg'
interface Props {
    src: string
}
console.log(s)
/**
 * 只支持绝对路径
 */
export const SVG = ({
    src
}: Props) => {
    const [svg, setSVG] = useState()
    useEffect(() => {
        import(src).then((value) => {
            console.log(value)
        })
    }, [src])
    return (
        <svg xmlns="http://www.w3.org/2000/svg">

        </svg>
    )
}