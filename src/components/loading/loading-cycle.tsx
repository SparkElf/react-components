import { useState } from "react"
import { useCallback } from "react"
import "./loading-cycle.scss"
interface Props {
    //圆的半径
    r?: number
    //线的粗细
    strokeWidth?: number
    //进度条的百分比 0-100
    percent: number
    //线的颜色
    stroke?: string
    //文字的颜色
    fill?: string
}
export const Loading = ({
    r = 40,
    strokeWidth = 5,
    percent = 0,
    stroke = "#03a9f4",
    fill = "#03a9f4",
}: Props) => {
    const [length, setLength] = useState(0)
    const center = r + strokeWidth
    const measuredRef = useCallback((node: SVGCircleElement) => {
        if (node !== null) setLength(node.getTotalLength())
    }, [])
    return (
        <div className="loading-cycle" style={{ width: center * 2, height: center * 2 }}>
            <svg>
                <circle
                    className="backgroundCircle"
                    cx={center} cy={center} r={r}
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={center} cy={center} r={r}
                    stroke={stroke} strokeWidth={strokeWidth}
                    ref={measuredRef}
                    strokeDasharray={length}
                    strokeDashoffset={(1 - percent / 100) * length}
                    transform={`rotate(-90 ${center} ${center})`}/* 画线默认从三点开始 需要旋转到零点 */
                    className="progress"
                />
            </svg>
            <span className="bigText" style={{ fontSize: percent === 100 ? r * 0.4 : r * 0.57, color: fill }}>
                {percent === 100 ? "DONE" : percent}
                <span className="smallText" color={fill} style={{ fontSize: r * 0.3, color: fill }}>
                    {percent === 100 ? "" : "%"}
                </span>
            </span>
        </div>
    )
}